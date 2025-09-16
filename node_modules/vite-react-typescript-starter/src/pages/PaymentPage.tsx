import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  CreditCard,
  Shield,
  CheckCircle,
  Lock,
  Smartphone,
  QrCode,
  ArrowLeft,
  Activity
} from 'lucide-react';
import { usePrintJobs } from '../hooks/usePrintJobs';
import { useBlockchain } from '../hooks/useBlockchain';

const PaymentPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { printJobs, updateJobStatus } = usePrintJobs();
  const { addTransaction, transactions } = useBlockchain();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const job = printJobs.find(j => j.id === jobId);

  useEffect(() => {
    if (!job) {
      toast.error('Print job not found');
      navigate('/customer');
    }
  }, [job, navigate]);

  const handlePayment = async () => {
    if (!job) return;

    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update job status
    updateJobStatus(jobId!, 'paid');
    
    // Add blockchain transaction
    addTransaction({
      type: 'payment_completed',
      details: {
        jobId: job.id,
        method: paymentMethod,
        files: job.files,
        settings: {
          copies: job.copies,
          color: job.color,
          paperSize: job.paperSize
        }
      },
      amount: job.totalCost
    });

    setProcessing(false);
    setCompleted(true);
    toast.success('Payment successful! Your documents will be printed shortly.');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your payment has been processed securely. Your documents are now being prepared for printing.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Transaction Details</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-blue-700">Job ID:</span>
                  <span className="text-blue-900 font-mono">{job.id.substring(0, 8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Amount:</span>
                  <span className="text-blue-900 font-semibold">${job.totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Status:</span>
                  <span className="text-green-600 font-semibold">Paid</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/blockchain')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <Activity className="h-5 w-5" />
                <span>View Blockchain Record</span>
              </button>
              <button
                onClick={() => navigate('/customer')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Print Another Document
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Documents</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Payment</h1>
          <p className="text-gray-600">Complete your payment to start printing</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <Smartphone className="h-5 w-5 mr-2 text-purple-600" />
                    <span className="font-medium">UPI</span>
                  </label>
                </div>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-purple-100 p-6 rounded-lg inline-block mb-4">
                    <QrCode className="h-24 w-24 text-purple-600 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan QR Code</h3>
                  <p className="text-gray-600 mb-4">
                    Use your UPI app to scan and pay ${job.totalCost.toFixed(2)}
                  </p>
                  <div className="bg-gray-100 px-4 py-2 rounded-lg inline-block">
                    <span className="font-mono text-sm">printzplus@upi</span>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 text-green-800">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Secure Payment</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your payment information is encrypted and secured with blockchain technology.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Files:</span>
                  <span className="font-medium">{job.files.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Copies:</span>
                  <span className="font-medium">{job.copies}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium">{job.color ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Paper Size:</span>
                  <span className="font-medium">{job.paperSize}</span>
                </div>
                {job.duplex && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duplex Discount:</span>
                    <span className="font-medium text-green-600">-20%</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>${job.totalCost.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                  processing
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    <span>Pay Securely</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By proceeding, you agree to our terms and privacy policy.
                Your transaction is secured with blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;