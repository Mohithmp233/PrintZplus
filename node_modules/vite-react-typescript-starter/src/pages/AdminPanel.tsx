import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Users,
  Activity,
  Shield,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Printer,
  DollarSign,
  BarChart3,
  PieChart,
  Calendar
} from 'lucide-react';
import { usePrintJobs } from '../hooks/usePrintJobs';
import { useBlockchain } from '../hooks/useBlockchain';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { printJobs } = usePrintJobs();
  const { transactions } = useBlockchain();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'jobs', label: 'Print Jobs', icon: Printer },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Calculate stats
  const totalRevenue = printJobs.reduce((sum, job) => sum + job.totalCost, 0);
  const totalJobs = printJobs.length;
  const activeShops = new Set(printJobs.map(job => job.qrId)).size;
  const uniqueCustomers = new Set(printJobs.map(job => job.customerId)).size;
  
  const jobsByStatus = printJobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const securityEvents = [
    { type: 'success', message: 'Document encryption verified', time: '2 minutes ago' },
    { type: 'warning', message: 'Unusual payment pattern detected', time: '15 minutes ago' },
    { type: 'success', message: 'Blockchain sync completed', time: '1 hour ago' },
    { type: 'info', message: 'New shop registration', time: '2 hours ago' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalJobs}</p>
              <p className="text-sm text-blue-600 mt-1">+8.2% from last week</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Printer className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Shops</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{activeShops}</p>
              <p className="text-sm text-purple-600 mt-1">+3 new this month</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{uniqueCustomers}</p>
              <p className="text-sm text-orange-600 mt-1">+15.3% growth</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-blue-600" />
            Job Status Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(jobsByStatus).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className="text-gray-600 capitalize">{status}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(count / totalJobs) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-green-600" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {printJobs.slice(-5).reverse().map((job, index) => (
              <div key={job.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Printer className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Print job for {job.fileName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {job.copies} copies • ${job.totalCost.toFixed(2)}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  job.status === 'completed' ? 'bg-green-100 text-green-800' :
                  job.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                  job.status === 'printing' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-green-600" />
          Security Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-800">Blockchain Secure</span>
            </div>
            <p className="text-sm text-green-600 mt-1">All transactions verified</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">Encryption Active</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">End-to-end document protection</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">2 Alerts Pending</span>
            </div>
            <p className="text-sm text-yellow-600 mt-1">Requires attention</p>
          </div>
        </div>

        <h4 className="font-medium text-gray-900 mb-3">Recent Security Events</h4>
        <div className="space-y-3">
          {securityEvents.map((event, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              {event.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
              {event.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
              {event.type === 'info' && <Activity className="h-5 w-5 text-blue-600" />}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{event.message}</p>
                <p className="text-xs text-gray-500">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage your PrintZplus system and monitor security</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'security' && renderSecurity()}
          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
              <p className="text-gray-600">User management features coming soon...</p>
            </div>
          )}
          {activeTab === 'jobs' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Print Job Management</h3>
              <p className="text-gray-600">Advanced job management features coming soon...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
              <p className="text-gray-600">System configuration options coming soon...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;