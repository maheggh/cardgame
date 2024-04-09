// pdfGenerator.js in helpers folder
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = async (cards) => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Generate your card layout here, this is just an example
  const cardLayout = cards.map(card => `
    <div class="card">
      <div class="card-front">${card.front}</div>
      <div class="card-back">${card.back}</div>
    </div>
  `).join('');

  // Assuming you have a div with id='pdf-layout' in your component
  const pdfLayout = document.getElementById('pdf-layout');
  pdfLayout.innerHTML = cardLayout;

  // Convert the layout to canvas using html2canvas
  const canvas = await html2canvas(pdfLayout);
  const imgData = canvas.toDataURL('image/png');

  // Add the canvas to the PDF
  pdf.addImage(imgData, 'PNG', 0, 0);

  // Save the PDF
  pdf.save('cards.pdf');
};

export default generatePDF;