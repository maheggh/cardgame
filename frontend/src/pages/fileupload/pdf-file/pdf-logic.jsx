import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import Styles from './pdfstyle.jsx';

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

    const cardsAssessor = {
      "card-who-is": cardWhoIs,
      "card-assessor": cardAssessor,
      "card-artefact": cardArtefact,
      "card-format": cardFormat,
      "card-context": cardContext,
      "card-timing": cardTiming,
    };
    const cardsMission = {
      "card-mission-one": cardMissionOne,
      "card-mission-two": cardMissionTwo,
      "card-mission-three": cardMissionThree,
    };

    const cardAssessmentValuesArray = Object.values(cardsAssessor);
    const cardMissionValuesArray = Object.values(cardsMission);

    Promise.all(
      cardAssessmentValuesArray.map(card =>
        fetch(`/api/cards/${card}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
      )
    ).then(dataAssessment => {
      Promise.all(
        cardMissionValuesArray.map(card =>
          fetch(`/api/cards/${card}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
        )
      ).then(dataMission => {
        console.log(dataAssessment, dataMission);

        // Generate your HTML
        let html = `
          <style>
            ${Styles}
          </style>
          <div class="card-container">
          ${dataAssessment.map((card) => (
            `   <div class="assessmentcard ${card["card-category"].replace(/\s+/g, '-').toLowerCase()}" data-card-id="${card._id}">
                    <div class="card-content">
                        <div class="cardCategory">${card["card-category"]}</div>
                        <div class="cardText">
                            <h2 class="card-name">${card['card-name']}</h2>
                            <p class="card-description">${card['card-description']}</p>
                            <p class="howortips">${["Who is assessed", "The assessor", "Assessment format"].includes(card['card-category']) ? 'HOW' : 'TIPS'}</p>
                            <p class="card-details">${card['card-details']}</p>
                        </div>
                        <div class="card-number">${card['card-id']}</div>
                    </div>
                </div>`
          )).join('')}
          ${dataMission.map((card) => (
            `   <div class="missioncard ">
                    <div class="card-content">
                        <div class="card-header ">${card["card-name"]}</div>
                        <div class="card-body">${card["card-description"].replace(/\n/g, "<br>")}</div>
                    </div>
                </div>`
          )).join('')}
          </div>
          `;

        // Use html2pdf to convert the HTML to a PDF
        const opt = {
          margin:       1,
          filename:     'top-shcema.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(html).save();

      }).catch(error => {
        console.log('There was a problem with the fetch operation: ' + error.message);
      });
    }).catch(error => {
      console.log('There was a problem with the fetch operation: ' + error.message);
    });
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