import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Upload,
  FileText,
  Settings,
  CreditCard,
  Shield,
  Eye,
  X,
  Plus,
  Minus,
  Check,
  Smartphone
} from 'lucide-react';
import { usePrintJobs } from '../hooks/usePrintJobs';
import { useBlockchain } from '../hooks/useBlockchain';

const CustomerInterface = () => {
  const { qrId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [step, setStep] = useState(qrId ? 2 : 1);
  const [files, setFiles] = useState<File[]>([]);
  const [printSettings, setPrintSettings] = useState({
    copies: 1,
    color: false,
    paperSize: 'A4',
    orientation: 'portrait',
    duplex: false
  });
  
  const { createPrintJob } = usePrintJobs();
  const { addTransaction } = useBlockchain();

  const paperSizes = ['A4', 'A3', 'Letter', 'Legal'];
  const pricePerPage = {
    'A4': { bw: 0.10, color: 0.50 },
    'A3': { bw: 0.20, color: 1.00 },
    'Letter': { bw: 0.10, color: 0.50 },
    'Legal': { bw: 0.15, color: 0.75 }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...uploadedFiles]);
    toast.success(`${uploadedFiles.length} file(s) uploaded securely`);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    toast.success('File removed');
  };

  const calculateTotalCost = () => {
    if (files.length === 0) return 0;
    
    const basePrice = pricePerPage[printSettings.paperSize as keyof typeof pricePerPage];
    const pricePerDocument = printSettings.color ? basePrice.color : basePrice.bw;
    const duplexMultiplier = printSettings.duplex ? 0.8 : 1;
    
    return files.length * printSettings.copies * pricePerDocument * duplexMultiplier;
  };

  const handleProceedToPayment = () => {
    if (files.length === 0) {
      toast.error('Please upload at least one document');
      return;
    }

    const jobId = createPrintJob({
      files: files.map(f => f.name),
      fileName: files[0].name,
      ...printSettings,
      totalCost: calculateTotalCost(),
      customerId: 'customer_' + Date.now(),
      qrId: qrId || ''
    });

    // Add blockchain transaction for job creation
    addTransaction({
      type: 'job_created',
      details: {
        jobId,
        files: files.length,
        settings: printSettings
      },
      amount: calculateTotalCost()
    });

    navigate(`/payment/${jobId}`);
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-md mx-auto"
    >
      <div className="bg-blue-100 p-4 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        <Smartphone className="h-12 w-12 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Scan QR Code</h2>
      <p className="text-gray-600 mb-8">
        Scan the QR code displayed at the print shop to start your secure printing session.
      </p>
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 mb-8">
        <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <div className="text-6xl">📱</div>
        </div>
        <p className="text-sm text-gray-500">
          Point your camera at the QR code
        </p>
      </div>
      <button
        onClick={() => setStep(2)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Simulate QR Scan
      </button>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* File Upload */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-blue-600" />
              Upload Documents
            </h3>
            
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop files here or click to upload
              </p>
              <p className="text-gray-500">
                Supports PDF, DOC, DOCX, JPG, PNG files
              </p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />

            {files.length > 0 && (
              <div className="mt-6 space-y-2">
                <h4 className="font-medium text-gray-900">Uploaded Files</h4>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Print Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-purple-600" />
              Print Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Copies
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setPrintSettings(prev => ({ ...prev, copies: Math.max(1, prev.copies - 1) }))}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-xl font-semibold text-gray-900 min-w-[3rem] text-center">
                    {printSettings.copies}
                  </span>
                  <button
                    onClick={() => setPrintSettings(prev => ({ ...prev, copies: prev.copies + 1 }))}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paper Size
                </label>
                <select
                  value={printSettings.paperSize}
                  onChange={(e) => setPrintSettings(prev => ({ ...prev, paperSize: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {paperSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Mode
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={!printSettings.color}
                      onChange={() => setPrintSettings(prev => ({ ...prev, color: false }))}
                      className="mr-2"
                    />
                    <span>Black & White</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={printSettings.color}
                      onChange={() => setPrintSettings(prev => ({ ...prev, color: true }))}
                      className="mr-2"
                    />
                    <span>Color</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orientation
                </label>
                <select
                  value={printSettings.orientation}
                  onChange={(e) => setPrintSettings(prev => ({ ...prev, orientation: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={printSettings.duplex}
                  onChange={(e) => setPrintSettings(prev => ({ ...prev, duplex: e.target.checked }))}
                  className="mr-3"
                />
                <span className="text-sm font-medium text-gray-700">
                  Double-sided printing (20% discount)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Summary & Payment */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Files:</span>
                <span className="font-medium">{files.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Copies:</span>
                <span className="font-medium">{printSettings.copies}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Color:</span>
                <span className="font-medium">{printSettings.color ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Paper Size:</span>
                <span className="font-medium">{printSettings.paperSize}</span>
              </div>
              {printSettings.duplex && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duplex Discount:</span>
                  <span className="font-medium text-green-600">-20%</span>
                </div>
              )}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${calculateTotalCost().toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 text-green-800">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Secured with Blockchain
                </span>
              </div>
              <p className="text-xs text-green-600 mt-1">
                Your documents are encrypted and protected
              </p>
            </div>

            <button
              onClick={handleProceedToPayment}
              disabled={files.length === 0}
              className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                files.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <span>Proceed to Payment</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Printing</h1>
          <p className="text-gray-600">
            Upload your documents securely and configure print settings
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {step > 1 ? <Check className="h-4 w-4" /> : '1'}
              </div>
              <div className={`h-1 w-16 ${step > 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 ? renderStep1() : renderStep2()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerInterface;