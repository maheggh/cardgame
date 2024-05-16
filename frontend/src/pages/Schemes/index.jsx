import React, { useState, useEffect } from 'react';
import './style.css'
import { getTotalTeachers, getTotalCards, getTotalCardTypes } from '../../helpers/api.js'; 
import RatingDisplay from '../../components/RatingDisplay';

function SchemesPage() {
  const [schemes, setSchemes] = useState(null);

  useEffect(() => {
    getTotalTeachers()
      .then(data => setSchemes(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="content-wrapper">
      <h1 className="title">Schemes</h1>
      <p>SUPER Assessor, a game designed for educators, is the result of a research project undertaken by the Department of Design in Trondheim. Its primary objective is to aid educators in the development of unique assessment methods. These methods are intended to create innovative ways to evaluate and grade students. Currently, SUPER Assessor exists solely as a card game. However, the creators have plans to expand its reach by making it available online as a digital tool for educators, both in Norway and globally. Additionally, they aim to sell it through an online shop, fostering a space for customers to engage in discussions about the tool’s content.</p>
      <h2 className="title">Game rules - How to play</h2>
        <ul>
          <li><b>Setup:</b> Players, usually educators but can include students or administrative staff, collaborate to create an assessment method. They start by choosing three missions (goals) for their assessment method. Each player then picks six cards from six categories: Who is assessed, The assessor, Artefact, Format, Context, and Timing. The game begins with one card from each category face- up on the table. </li>
          <li><b>Gameplay:</b> Players take turns and can choose from four actions: a. Add a card to any category on the table. b. Remove a card from the table by turning it face down. c. Replace a card by turning the existing card face down and placing a new card over it. d. Discard all cards in hand and draw six new ones. Players should always have six cards in hand, so they draw a new card after using one. </li>
          <li><b>Ending the Game:</b> The game ends when half or more of the players agree they are satisfied with the assessment method they've created. This triggers the final round. 4. Scoring: Players evaluate how well they achieved their missions, awarding up to three points for each mission.</li>
        </ul>
      <RatingDisplay rating={2.6}/>
    </div>
  );
}

export default SchemesPage;