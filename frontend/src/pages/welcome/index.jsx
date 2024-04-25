import React, { useState, useEffect } from 'react';
import './style.css'
import { getTotalTeachers } from '../../api/api'; 

function Welcome() {
  const [totalTeachers, setTotalTeachers] = useState(null);

  useEffect(() => {
    getTotalTeachers()
      .then(data => setTotalTeachers(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="content-wrapper">
      <h1 className="title">Welcome to the Super Assessor</h1>
      <p>SUPER Assessor, a game designed for educators, is the result of a research project undertaken by the Department of Design in Trondheim. Its primary objective is to aid educators in the development of unique assessment methods. These methods are intended to create innovative ways to evaluate and grade students. Currently, SUPER Assessor exists solely as a card game. However, the creators have plans to expand its reach by making it available online as a digital tool for educators, both in Norway and globally. Additionally, they aim to sell it through an online shop, fostering a space for customers to engage in discussions about the tool’s content.</p>
      <p>Amount of teachers registered: {totalTeachers}</p>
    </div>
  );
}

export default Welcome;