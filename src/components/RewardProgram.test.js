import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RewardProgram from './RewardProgram';
import { fetchTransactions } from '../api/api';
import { calculatePoints } from '../utils/utils';

// Mock the fetchTransactions function
jest.mock('../api/api', () => ({
  fetchTransactions: jest.fn(),
}));

// Mock the calculatePoints function
jest.mock('../utils/utils', () => ({
  calculatePoints: jest.fn(),
}));

describe('RewardProgram Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

  test('renders RewardProgram component', () => {
    render(<RewardProgram />);
    expect(screen.getByText('Reward Points')).toBeInTheDocument();
  });

//   test('calculates points correctly', async () => {
//     const transactions = [
//       { customerId: '1', date: '2023-01-15', amount: 120 },
//       { customerId: '2', date: '2023-02-15', amount: 80 },
//       { customerId: '3', date: '2023-01-20', amount: 200 },
//     ];

//     fetchTransactions.mockResolvedValue(transactions);
//     calculatePoints.mockImplementation((amount) => amount / 10);

//     render(<RewardProgram />);

//     await waitFor(() => {
//       expect(screen.getByText('1')).toBeInTheDocument();
//     //   expect(screen.getByText('12')).toBeInTheDocument(); // January points for customer 1
//     //   expect(screen.getByText('8')).toBeInTheDocument(); // February points for customer 1
//     //   expect(screen.getByText('20')).toBeInTheDocument(); // January points for customer 2
//     });
//   });

//   test('fetchTransactions is called on mount', async () => {
//     fetchTransactions.mockResolvedValue([]);
//     render(<RewardProgram />);

//     await waitFor(() => {
//       expect(fetchTransactions).toHaveBeenCalledTimes(1);
//     });
//   });
});