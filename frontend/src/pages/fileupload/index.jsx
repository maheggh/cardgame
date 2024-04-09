import React, { useState } from "react";
import CardsList from "./cardList";
import FileUpload from "./helpers/fileUpload";
import generatePDF from "./helpers/pdfGenerator"; // Make sure this is the correct path to your PDF generation function
import "./style.css";

const App = () => {
  const [cards, setCards] = useState([]);

  // Function that handles the PDF generation
  const handleGeneratePDF = (selectedCards) => {
    generatePDF(selectedCards);
  };

  return (
    <>
      <div className="app-container">
        <h1 className="app-title">Cards Upload</h1>

        <FileUpload setCards={setCards} />
        {cards.length > 0 && (
          <CardsList cards={cards} setCards={setCards} className="cards-list" />
        )}
      </div>
      <button
        onClick={() => handleGeneratePDF(cards)} className="generate-pdf-button">
        Generate PDF
      </button>
    </>
  );
};

export default App;