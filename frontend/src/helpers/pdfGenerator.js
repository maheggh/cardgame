// pdfGenerator.js
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = async (cards) => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Prepare a container for the card images
  const cardsContainer = document.createElement('div');
  cardsContainer.setAttribute('id', 'pdf-layout');
  document.body.appendChild(cardsContainer);

  // Populate the container with images of cards
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.style.display = 'flex';
    cardElement.style.justifyContent = 'space-between'; // Two-column layout
    cardElement.style.marginBottom = '10px'; 

    // Front of the card
    const imgFront = new Image();
    imgFront.src = card.front;
    imgFront.style.width = '50%'; 
    cardElement.appendChild(imgFront);

    // Back of the card (assuming you have a back image or similar setup)
    const imgBack = new Image();
    imgBack.src = card.back;
    imgBack.style.width = '50%'; 
    cardElement.appendChild(imgBack);

    cardsContainer.appendChild(cardElement);
  });

  // Convert the layout to canvas using html2canvas
  html2canvas(cardsContainer).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    // Add the canvas to the PDF
    pdf.addImage(imgData, 'PNG', 0, 0);

    // Save the PDF
    pdf.save('cards.pdf');

    // Clean up: remove the temporary container
    document.body.removeChild(cardsContainer);
  });
};

export default generatePDF;
