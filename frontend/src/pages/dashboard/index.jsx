import React, { useState, useEffect } from 'react';
import StatCounter from '../../components/StatCounter/';
import { authorize, usersAuthorize } from '../../api/api.js';
import { useAuth } from '../../UserContext.jsx';
import './style.css'

function Dashboard() {
  const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const { token } = useAuth();
  const [cardCategoryCount, setCardCategoryCount] = useState(0);

  const exportToPdf = () => {
    const element = document.getElementById('content-to-pdf');
    html2pdf().from(element).save();
  };

  useEffect(() => {
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

    const getUserCount = async () => {
      try {
        const allUsers = await usersAuthorize(token);
        setUserCount(allUsers.length); // set the count of users
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getAllData();
    getUserCount();
  }, [token]);

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