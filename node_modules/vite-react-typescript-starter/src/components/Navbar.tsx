import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Printer, Smartphone, CreditCard, Activity, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/shop', label: 'Shop Dashboard', icon: Printer },
    { path: '/customer', label: 'Customer App', icon: Smartphone },
    { path: '/blockchain', label: 'Blockchain', icon: Activity },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PrintZplus
            </span>
          </Link>

          <div className="flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:block font-medium">{label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;