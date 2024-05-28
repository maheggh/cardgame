import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import Styles from './pdfstyle.jsx';
import filenamify from 'filenamify';


import whoAssessedImg from '../../assets/cards-background/who-is-assessed.png';
import theAssessorImg from '../../assets/cards-background/the-assessor.png';
import timingImg from '../../assets/cards-background/timing.png';
import formatImg from '../../assets/cards-background/format.png';
import contextImg from '../../assets/cards-background/context.png';
import artefactImg from '../../assets/cards-background/artefact.png';
import missionImg from '../../assets/cards-background/mission.png';

const MakePDF = ({schemaId}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`/api/assscheme/${schemaId}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const generatePDF = (data) => {
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
                              <h2 class="card-name cardInfo">${card['card-name']}</h2>
                              <p class="card-description cardInfo">${card['card-description']}</p>
                              <p class="howortips cardInfo">${["Who is assessed", "The assessor", "Assessment format"].includes(card['card-category']) ? 'HOW' : 'TIPS'}</p>
                              <p class="card-details cardInfo">${card['card-details']}</p>
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
            <img src="${whoAssessedImg}"> </img>
            <img src=${theAssessorImg} alt="The Assessor" />
            <img src=${artefactImg} alt="Artefact" />
            <img src=${formatImg} alt="Format" />
            <img src=${contextImg} alt="Context" />
            <img src=${timingImg} alt="Timing" />
            <img src=${missionImg} alt="Mission" />
            <img src=${missionImg} alt="Mission" />
            <img src=${missionImg} alt="Mission" />
          </div>
          `;




        // Use html2pdf to convert the HTML to a PDF
        const opt = {
          margin:       0.7,
          filename:     `${data['scheme-name']}.pdf`,
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
    <>
      <span onClick={() => data && generatePDF(data)} className="pdf-button bookmark-icon">
        <i className="fa-solid fa-file-pdf"/>
      </span>
    </>
  );
};

export default MakePDF;