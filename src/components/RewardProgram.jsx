import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../api/api';
import { calculatePoints } from '../utils/utils';
import './RewardProgram.css';

const RewardProgram = () => {
  
  // State to store calculated points
  const [points, setPoints] = useState({});

  // Array of month names for display
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Function to calculate points for each transaction and group them by customer and month
  const calculatePointsMap = (transactions) => {
    const pointsMap = {};
    transactions.forEach(({ customerId, date, amount }) => {
      const monthIndex = new Date(date).getMonth();
      const monthName = months[monthIndex];
      const customerPoints = calculatePoints(amount);

      // Initialize customer and month if not already present
      if (!pointsMap[customerId]) pointsMap[customerId] = {};
      if (!pointsMap[customerId][monthName]) pointsMap[customerId][monthName] = 0;
      // Add points for the current transaction
      pointsMap[customerId][monthName] += customerPoints;

      // Initialize total points if not already present
      if (!pointsMap[customerId].total) pointsMap[customerId].total = 0;
      // Add points to the total
      pointsMap[customerId].total += customerPoints;
    });
    return pointsMap;
  };

  useEffect(() => {
    // Fetch transaction data and calculate points
    const fetchData = async () => {
      const transactions = await fetchTransactions();
      const pointsMap = calculatePointsMap(transactions);
      setPoints(pointsMap);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Reward Points</h1>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            {months.map((month) => (
              <th key={month}>{month}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(points).map((customerId) => (
            <tr key={customerId}>
              <td>{customerId}</td>
              {months.map((month) => (
                <td key={month}>{points[customerId][month] || 0}</td>
              ))}
              <td>{points[customerId].total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardProgram;