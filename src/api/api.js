// api.js
import { transactions } from '../data';

export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000);
  });
};