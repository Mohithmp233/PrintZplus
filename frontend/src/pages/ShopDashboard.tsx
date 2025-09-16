import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import toast from 'react-hot-toast';
import { 
  QrCode, 
  Printer, 
  Activity, 
  DollarSign, 
  Users,
  RefreshCw,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { usePrintJobs } from '../hooks/usePrintJobs';
import { useBlockchain } from '../hooks/useBlockchain';

const ShopDashboard = () => {
  const [qrData, setQrData] = useState('');
  const [shopName, setShopName] = useState('Tech Print Center');
  const [printerStatus, setPrinterStatus] = useState('online');
  const { printJobs, generateQRCode, updateJobStatus } = usePrintJobs();
  const { addTransaction } = useBlockchain();

  const generateNewQR = () => {
    const qrId = generateQRCode(shopName);
    setQrData(`${window.location.origin}/customer/${qrId}`);
    toast.success('New QR code generated!');
    
    // Add blockchain transaction for QR generation
    addTransaction({
      type: 'qr_generated',
      details: { shopName, qrId },
      amount: 0
    });
  };

  const handlePrintJob = (jobId: string) => {
    updateJobStatus(jobId, 'printing');
    toast.success('Print job started!');
    
    setTimeout(() => {
      updateJobStatus(jobId, 'completed');
      toast.success('Print job completed!');
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'paid': return 'text-blue-600 bg-blue-100';
      case 'printing': return 'text-purple-600 bg-purple-100';
      case 'completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'paid': return DollarSign;
      case 'printing': return Printer;
      case 'completed': return CheckCircle;
      default: return AlertCircle;
    }
  };

  const stats = [
    { label: 'Today\'s Jobs', value: printJobs.length, icon: Activity, color: 'text-blue-600' },
    { label: 'Revenue', value: `$${printJobs.reduce((sum, job) => sum + job.totalCost, 0).toFixed(2)}`, icon: DollarSign, color: 'text-green-600' },
    { label: 'Customers', value: new Set(printJobs.map(job => job.customerId)).size, icon: Users, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop Dashboard</h1>
          <p className="text-gray-600">Manage your print jobs and generate QR codes for customers</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Code Generator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <QrCode className="h-5 w-5 mr-2 text-blue-600" />
                QR Code Generator
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Name
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter shop name"
                />
              </div>

              <button
                onClick={generateNewQR}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 mb-4"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Generate New QR Code</span>
              </button>

              {qrData && (
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <QRCode value={qrData} size={200} className="mx-auto mb-4" />
                  <p className="text-sm text-gray-600">
                    Customers can scan this QR code to start printing
                  </p>
                </div>
              )}

              <div className="mt-4 p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center space-x-2">
                  <div className={`h-3 w-3 rounded-full ${printerStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-green-800">
                    Printer Status: {printerStatus === 'online' ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Print Jobs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Printer className="h-5 w-5 mr-2 text-purple-600" />
                  Recent Print Jobs
                </h2>
              </div>

              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {printJobs.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Printer className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No print jobs yet. Generate a QR code to get started!</p>
                  </div>
                ) : (
                  printJobs.map((job) => {
                    const StatusIcon = getStatusIcon(job.status);
                    return (
                      <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-medium text-gray-900">{job.fileName}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {job.status}
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-gray-500 space-x-4">
                              <span>{job.copies} copies</span>
                              <span>{job.color ? 'Color' : 'B&W'}</span>
                              <span>{job.paperSize}</span>
                              <span>${job.totalCost.toFixed(2)}</span>
                            </div>
                            <div className="mt-1 text-xs text-gray-400">
                              Customer: {job.customerId} • {new Date(job.createdAt).toLocaleTimeString()}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {job.status === 'paid' && (
                              <button
                                onClick={() => handlePrintJob(job.id)}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
                              >
                                <Printer className="h-3 w-3" />
                                <span>Print</span>
                              </button>
                            )}
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>View</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;