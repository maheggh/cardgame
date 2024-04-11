import React, { useState, useEffect } from 'react';
import StatCounter from '../../components/StatCounter/';
import { authorize, usersAuthorize } from '../../api/api.js';
import { useAuth } from '../../UserContext.jsx';
import './style.css'

function Dashboard() {
  // State for data, user count, and card category count
  const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [cardCategoryCount, setCardCategoryCount] = useState(0);

  // Get token from context
  const { token } = useAuth();

  // Fetch data on component mount
  useEffect(() => {
    // Fetch all cards and count unique categories
    const getAllData = async () => {
      try {
        const allCards = await authorize(token);
        setData(allCards);
        const uniqueCardCategories = new Set(allCards.map(card => card['card-category']));
        setCardCategoryCount(uniqueCardCategories.size);
      } catch (err) {
        console.log(err);
      }
    };

    // Fetch all users and count them
    const getUserCount = async () => {
      try {
        const allUsers = await usersAuthorize(token);
        setUserCount(allUsers.length);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Execute fetch functions
    getAllData();
    getUserCount();
  }, [token]);

  // Render dashboard with stat counters
  return (
    <div className="content-wrapper">
      <h1 className="title">Dashboard</h1>
      <StatCounter title={"Total cards available"} number={data.length}/>
      <StatCounter title={"Card types available"} number={cardCategoryCount}/>
      <StatCounter title={"Total users"} number={userCount}/>
    </div>
  );
}

export default Dashboard;