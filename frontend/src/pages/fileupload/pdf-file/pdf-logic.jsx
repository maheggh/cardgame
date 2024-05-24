import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const schemaId = "664f9ca9a23f3905a8f625e8";

const MakePDF = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/assscheme/${schemaId}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Log fetched data
        setData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const generatePDF = (data) => {
    console.log('Data passed to generatePDF:', data); // Log data passed to generatePDF

    const { 
      _id, 
      "scheme-name": schemeName, 
      "card-who-is": cardWhoIs,
      "card-assessor": cardAssessor,
      "card-artefact": cardArtefact,
      "card-format": cardFormat,
      "card-context": cardContext,
      "card-timing": cardTiming,
      "card-mission-one": cardMissionOne,
      "card-mission-two": cardMissionTwo,
      "card-mission-three": cardMissionThree,
      creator,
      __v 
    } = data;

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set the content of the PDF
    doc.text(`Scheme ID: ${_id}`, 10, 10);
    doc.text(`Scheme Name: ${schemeName}`, 10, 20);
    doc.text(`Card Who Is: ${cardWhoIs}`, 10, 30);
    doc.text(`Card Assessor: ${cardAssessor}`, 10, 40);
    doc.text(`Card Artefact: ${cardArtefact}`, 10, 50);
    doc.text(`Card Format: ${cardFormat}`, 10, 60);
    doc.text(`Card Context: ${cardContext}`, 10, 70);
    doc.text(`Card Timing: ${cardTiming}`, 10, 80);
    doc.text(`Card Mission One: ${cardMissionOne}`, 10, 90);
    doc.text(`Card Mission Two: ${cardMissionTwo}`, 10, 100);
    doc.text(`Card Mission Three: ${cardMissionThree}`, 10, 110);
    doc.text(`Creator: ${creator}`, 10, 120);

    // Save the PDF
    doc.save('scheme.pdf');
  };

  return (
    <div>
      <button onClick={() => data && generatePDF(data)} className="button generate-pdf-button">
        <i className="fa-solid fa-file-pdf"/> Generate PDF
      </button>
    </div>
  );
};

export default MakePDF;
