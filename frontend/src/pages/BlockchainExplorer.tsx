import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Shield,
  Search,
  Hash,
  Clock,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useBlockchain } from '../hooks/useBlockchain';

const BlockchainExplorer = () => {
  const { transactions, getTransactionHash } = useBlockchain();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTx, setExpandedTx] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = searchTerm === '' || 
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getTransactionHash(tx.id).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || tx.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'qr_generated': return 'text-blue-600 bg-blue-100';
      case 'job_created': return 'text-purple-600 bg-purple-100';
      case 'payment_completed': return 'text-green-600 bg-green-100';
      case 'document_encrypted': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'qr_generated': return Hash;
      case 'job_created': return FileText;
      case 'payment_completed': return DollarSign;
      case 'document_encrypted': return Lock;
      default: return Activity;
    }
  };

  const formatTransactionType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const totalValue = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const uniqueTypes = [...new Set(transactions.map(tx => tx.type))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Activity className="h-8 w-8 mr-3 text-blue-600" />
            Blockchain Explorer
          </h1>
          <p className="text-gray-600">
            View all blockchain transactions for secure document printing operations
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{transactions.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Activity className="h-6 w-6 text-blue-600" />
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
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${totalValue.toFixed(2)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
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
                <p className="text-sm font-medium text-gray-600">Secured Operations</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{transactions.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transaction Types</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{uniqueTypes.length}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>
                      {formatTransactionType(type)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No transactions found</p>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredTransactions.map((transaction, index) => {
                const Icon = getTypeIcon(transaction.type);
                const isExpanded = expandedTx === transaction.id;
                
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedTx(isExpanded ? null : transaction.id)}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`p-2 rounded-full ${getTypeColor(transaction.type)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <h3 className="font-medium text-gray-900">
                              {formatTransactionType(transaction.type)}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirmed
                            </span>
                          </div>
                          
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Hash className="h-3 w-3" />
                              <span className="font-mono">{getTransactionHash(transaction.id)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {transaction.amount > 0 && (
                            <p className="font-semibold text-gray-900">
                              ${transaction.amount.toFixed(2)}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Transaction Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Transaction ID:</span>
                              <p className="font-mono text-gray-600 break-all">{transaction.id}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Block Hash:</span>
                              <p className="font-mono text-gray-600 break-all">{getTransactionHash(transaction.id)}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Timestamp:</span>
                              <p className="text-gray-600">{new Date(transaction.timestamp).toISOString()}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Amount:</span>
                              <p className="text-gray-600">
                                {transaction.amount > 0 ? `$${transaction.amount.toFixed(2)}` : 'N/A'}
                              </p>
                            </div>
                          </div>
                          
                          {transaction.details && (
                            <div className="mt-4">
                              <span className="font-medium text-gray-700">Additional Details:</span>
                              <pre className="mt-2 bg-white rounded border p-3 text-xs text-gray-600 overflow-auto">
                                {JSON.stringify(transaction.details, null, 2)}
                              </pre>
                            </div>
                          )}

                          <div className="mt-4 flex items-center space-x-2 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Transaction verified and immutably stored on blockchain
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainExplorer;