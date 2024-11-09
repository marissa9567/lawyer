// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase'; // Adjust path as necessary
import { useAuth } from '../Context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'yourCollectionName')); // Ensure correct collection name
        const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>jh</h1>
      {currentUser ? <h2>Welcome, {currentUser.email}</h2> : <p>Please log in to view your dashboard.</p>}
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li> // Replace with your data structure
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
