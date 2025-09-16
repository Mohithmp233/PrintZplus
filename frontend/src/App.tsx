import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShopDashboard from './pages/ShopDashboard';
import CustomerInterface from './pages/CustomerInterface';
import PaymentPage from './pages/PaymentPage';
import BlockchainExplorer from './pages/BlockchainExplorer';
import AdminPanel from './pages/AdminPanel';
import { PrintJobProvider } from './context/PrintJobContext';
import { BlockchainProvider } from './context/BlockchainContext';

function App() {
  return (
    <Router>
      <BlockchainProvider>
        <PrintJobProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Navbar />
            <motion.main 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopDashboard />} />
                <Route path="/customer/:qrId?" element={<CustomerInterface />} />
                <Route path="/payment/:jobId" element={<PaymentPage />} />
                <Route path="/blockchain" element={<BlockchainExplorer />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </motion.main>
            <Toaster position="top-right" />
          </div>
        </PrintJobProvider>
      </BlockchainProvider>
    </Router>
  );
}

export default App;