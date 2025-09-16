import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface PrintJob {
  id: string;
  qrId: string;
  customerId: string;
  files: string[];
  fileName: string;
  copies: number;
  color: boolean;
  paperSize: string;
  orientation: string;
  duplex: boolean;
  totalCost: number;
  status: 'pending' | 'paid' | 'printing' | 'completed';
  createdAt: string;
}

interface PrintJobContextType {
  printJobs: PrintJob[];
  createPrintJob: (job: Omit<PrintJob, 'id' | 'status' | 'createdAt'>) => string;
  updateJobStatus: (jobId: string, status: PrintJob['status']) => void;
  generateQRCode: (shopName: string) => string;
}

const PrintJobContext = createContext<PrintJobContextType | undefined>(undefined);

export const PrintJobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [printJobs, setPrintJobs] = useState<PrintJob[]>([]);

  const createPrintJob = (jobData: Omit<PrintJob, 'id' | 'status' | 'createdAt'>) => {
    const newJob: PrintJob = {
      ...jobData,
      id: uuidv4(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setPrintJobs(prev => [...prev, newJob]);
    return newJob.id;
  };

  const updateJobStatus = (jobId: string, status: PrintJob['status']) => {
    setPrintJobs(prev => 
      prev.map(job => 
        job.id === jobId ? { ...job, status } : job
      )
    );
  };

  const generateQRCode = (shopName: string) => {
    return `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <PrintJobContext.Provider value={{
      printJobs,
      createPrintJob,
      updateJobStatus,
      generateQRCode
    }}>
      {children}
    </PrintJobContext.Provider>
  );
};

export const usePrintJobContext = () => {
  const context = useContext(PrintJobContext);
  if (context === undefined) {
    throw new Error('usePrintJobContext must be used within a PrintJobProvider');
  }
  return context;
};