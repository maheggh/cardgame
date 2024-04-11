import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Mock function to render a card element, replace with your actual rendering logic
const renderCardElementAsync = async (cardData) => {
  const cardElement = document.createElement('div');
  // Simulate asynchronous rendering, e.g., fetching images or data
  await new Promise(resolve => setTimeout(resolve, 100)); // Mock async delay
  cardElement.innerHTML = `<h4>${cardData.cardType}: ${cardData.cardName}</h4>
                           <img src="${cardData.imageUrl}" style="width:100px;height:150px;">`;
  return cardElement;
};

const generatePDF = async (cards) => {
  const doc = new jsPDF();
  let promises = [];

  cards.forEach(card => {
    promises.push(new Promise(async (resolve) => {
      const cardElement = await renderCardElementAsync(card);
      document.body.appendChild(cardElement); // Add to DOM to capture
      await new Promise(resolve => setTimeout(resolve, 50)); // Give time for images to load

      html2canvas(cardElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        document.body.removeChild(cardElement); // Clean-up
        resolve({imgData, card});
      });
    }));
  });

  Promise.all(promises).then(results => {
    results.forEach((result, index) => {
      if (index > 0) doc.addPage();
      doc.addImage(result.imgData, 'PNG', 10, 10, 180, 260); // Adjust as needed
    });
    doc.save('cards.pdf');
  });
};

// Example usage
const cards = [
  {cardType: 'Mission', cardName: 'Learn', imageUrl: 'path/to/image1.png'},
  {cardType: 'Assessment', cardName: 'Quiz', imageUrl: 'path/to/image2.png'},
  // Add more card objects
];

generatePDF(cards);

export default generatePDF;

