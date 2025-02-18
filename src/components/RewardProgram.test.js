import { render, screen, waitFor } from '@testing-library/react';
import RewardProgram from './RewardProgram'; // Adjust path as needed
import { fetchTransactions } from '../api/api'; // Import the function to mock

// Mock the fetchTransactions and calculatePoints functions
jest.mock('../api/api', () => ({
  fetchTransactions: jest.fn(),
}));

describe('RewardProgram Component', () => {
  const mockTransactions = [
    { customerId: 1, date: '2025-01-15', amount: 120 },
    { customerId: 1, date: '2025-01-20', amount: 75 },
    { customerId: 1, date: '2025-02-10', amount: 200 },
    { customerId: 1, date: '2025-03-05', amount: 90 },
    { customerId: 1, date: '2025-01-25', amount: 200 },
    { customerId: 1, date: '2025-02-10', amount: 50 },
    { customerId: 1, date: '2025-03-15', amount: 130 },
    { customerId: 1, date: '2025-01-30', amount: 150 },
    { customerId: 1, date: '2025-02-15', amount: 130 },
    { customerId: 1, date: '2025-03-05', amount: 90 },
  ];

  beforeEach(() => {
    // Mock fetchTransactions to return mock data
    fetchTransactions.mockResolvedValue(mockTransactions);
  });

  it('renders the reward points table correctly', async () => {
    render(<RewardProgram />);
  
    await waitFor(() => {
      // Check if the table header is rendered
      expect(screen.getByText('Customer ID')).toBeInTheDocument();
      expect(screen.getByText('January')).toBeInTheDocument();
      expect(screen.getByText('February')).toBeInTheDocument();
      expect(screen.getByText('March')).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
    });
  
    
    // Wait for the points to be calculated and displayed
    await waitFor(() => {
      expect(screen.getByText(/515/)).toBeInTheDocument(); // Points for January (customer 1)
      expect(screen.getByText(/360/)).toBeInTheDocument();  // Points for February (customer 1)
      expect(screen.getByText(/190/)).toBeInTheDocument();   // Points for March (customer 1)
      expect(screen.getByText(/1065/)).toBeInTheDocument();  // Total points for customer 1
    });
  });
});
