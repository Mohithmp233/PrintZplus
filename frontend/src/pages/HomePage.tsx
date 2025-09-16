import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Printer, 
  Smartphone, 
  Lock, 
  Zap, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Documents are encrypted and secured using blockchain technology, preventing unauthorized access.'
    },
    {
      icon: Lock,
      title: 'Privacy Protection',
      description: 'Shop agents never see your documents. Direct printer communication ensures complete privacy.'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'QR code scanning and instant payment processing for seamless printing experience.'
    },
    {
      icon: Users,
      title: 'Multi-Platform',
      description: 'Works across all devices - desktop for shops, mobile for customers.'
    }
  ];

  const benefits = [
    'End-to-end document encryption',
    'Immutable transaction records',
    'Zero document exposure to shop staff',
    'Real-time payment processing',
    'Blockchain-verified print history',
    'Multi-format document support'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Secure Document Printing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Powered by Blockchain
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Revolutionary printing solution that ensures complete document privacy and security. 
              No more document exposure to shop agents - powered by blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Printer className="h-5 w-5" />
                <span>Shop Dashboard</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/customer"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Smartphone className="h-5 w-5" />
                <span>Customer App</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PrintZplus?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced security features and seamless user experience make PrintZplus 
              the future of secure document printing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg w-fit mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Complete Document Security
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our blockchain-powered system ensures your documents remain private and secure 
                throughout the entire printing process. No more worrying about document misuse 
                or unauthorized access.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-2 font-bold text-sm min-w-[2rem] h-8 flex items-center justify-center">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Generate QR Code</h4>
                    <p className="text-gray-600">Shop creates a secure QR code for printing session</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 text-purple-600 rounded-full p-2 font-bold text-sm min-w-[2rem] h-8 flex items-center justify-center">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Scan & Upload</h4>
                    <p className="text-gray-600">Customer scans QR and uploads documents securely</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 text-green-600 rounded-full p-2 font-bold text-sm min-w-[2rem] h-8 flex items-center justify-center">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pay & Print</h4>
                    <p className="text-gray-600">Secure payment triggers direct printing without exposure</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Secure Your Printing?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of businesses and customers who trust PrintZplus for secure document printing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Start as Shop Owner</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/customer"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Try Customer App</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;