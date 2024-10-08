import React, { useState, useEffect } from 'react';
import './style.css';
import StatCounter from '../../components/StatCounter/';
import FPDeck from '../../components/FrontPageDeck/';
import { getTotalTeachers, getTotalCards, getTotalCardTypes } from '../../helpers/api.js';
import { getTopSchemes } from '../../API/schemes';

function Welcome() {
  // State variables to store counts and top schemes
  const [totalTeachers, setTotalTeachers] = useState(null);
  const [totalCards, setTotalCards] = useState(null);
  const [totalCardTypes, setTotalCardTypes] = useState(null);
  const [topDecks, setTopDecks] = useState(null);

  // useEffect to fetch data on component mount
  useEffect(() => {
    // Fetch total number of teachers
    getTotalTeachers()
      .then(data => setTotalTeachers(data))
      .catch(error => console.error(error));

    // Fetch total number of cards
    getTotalCards()
      .then(data => setTotalCards(data))
      .catch(error => console.error(error));

    // Fetch total number of card types
    getTotalCardTypes()
      .then(data => setTotalCardTypes(data))
      .catch(error => console.error(error));

    // Fetch top schemes
    getTopSchemes()
      .then(data => setTopDecks(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="content-wrapper">
      <h1 className="title">Welcome to the Super Assessor</h1>
      <p>SUPER Assessor, a game designed for educators, is the result of a research project undertaken by the Department of Design in Trondheim. Its primary objective is to aid educators in the development of unique assessment methods. These methods are intended to create innovative ways to evaluate and grade students. Currently, SUPER Assessor exists solely as a card game. However, the creators have plans to expand its reach by making it available online as a digital tool for educators, both in Norway and globally. Additionally, they aim to sell it through an online shop, fostering a space for customers to engage in discussions about the tool’s content.</p>
      
      <div className="cardWrapper">
        {/* Display the total number of teachers */}
        <StatCounter title={"Teachers registered"} number={totalTeachers}/>
        {/* Display the total number of cards */}
        <StatCounter title={"Total cards available"} number={totalCards}/>
        {/* Display the total number of card types */}
        <StatCounter title={"Card types available"} number={totalCardTypes}/>
      </div>
      
      <h2 className="title">Game rules - How to play</h2>
      <ul>
        <li><b>Setup:</b> Players, usually educators but can include students or administrative staff, collaborate to create an assessment method. They start by choosing three missions (goals) for their assessment method. Each player then picks six cards from six categories: Who is assessed, The assessor, Artefact, Format, Context, and Timing. The game begins with one card from each category face- up on the table.</li>
        <li><b>Gameplay:</b> Players take turns and can choose from four actions: a. Add a card to any category on the table. b. Remove a card from the table by turning it face down. c. Replace a card by turning the existing card face down and placing a new card over it. d. Discard all cards in hand and draw six new ones. Players should always have six cards in hand, so they draw a new card after using one.</li>
        <li><b>Ending the Game:</b> The game ends when half or more of the players agree they are satisfied with the assessment method they've created. This triggers the final round. 4. Scoring: Players evaluate how well they achieved their missions, awarding up to three points for each mission.</li>
      </ul>
      
      <br/><br/>
      <h1>Most popular decks</h1>
      {/* Display top decks or a message if none are available */}
      {topDecks && topDecks.length > 0 ? topDecks.map(scheme => (
        <FPDeck data={scheme} key={scheme._id}/>
      )) : (
        <div>No decks available</div>
      )}
    </div>
  );
}

export default Welcome;
