import { usePrintJobContext } from '../context/PrintJobContext';

export const usePrintJobs = () => {
  return usePrintJobContext();
};