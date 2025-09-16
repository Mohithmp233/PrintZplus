import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface BlockchainTransaction {
  id: string;
  type: 'qr_generated' | 'job_created' | 'payment_completed' | 'document_encrypted';
  details: Record<string, any>;
  amount: number;
  timestamp: string;
  blockHash?: string;
}

interface BlockchainContextType {
  transactions: BlockchainTransaction[];
  addTransaction: (tx: Omit<BlockchainTransaction, 'id' | 'timestamp'>) => void;
  getTransactionHash: (txId: string) => string;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const BlockchainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);

  const addTransaction = (txData: Omit<BlockchainTransaction, 'id' | 'timestamp'>) => {
    const newTransaction: BlockchainTransaction = {
      ...txData,
      id: uuidv4(),
      timestamp: new Date().toISOString()
    };

    setTransactions(prev => [...prev, newTransaction]);
  };

  const getTransactionHash = (txId: string) => {
    // Generate a deterministic hash-like string for demo purposes
    const hash = txId.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0).toString(16);
    }, '');
    return `0x${hash.padEnd(64, '0').substring(0, 64)}`;
  };

  return (
    <BlockchainContext.Provider value={{
      transactions,
      addTransaction,
      getTransactionHash
    }}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchainContext = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchainContext must be used within a BlockchainProvider');
  }
  return context;
};