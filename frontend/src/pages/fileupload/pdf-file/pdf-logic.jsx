import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function generatePDF() {
  // Retrieve cards from local storage
const cards = JSON.parse(localStorage.getItem('FAVOURITE_CARDS_LIST_STORE')) || [];

let imageSrcArray = [];
let imageSrc2Array = [];

cards.forEach((card) => {
  const imageSrc = `./assets/cards-png/SUPER cards poker size ${ "061123" + (card['card-id']*2-1)}.png`;
  const imageSrc2 = `./assets/cards-png/SUPER cards poker size ${ "061123" + (card['card-id']*2)}.png`;
  imageSrcArray.push(imageSrc);
  imageSrc2Array.push(imageSrc2);
});

let combinedArray = [];

for (let i = 0; i < imageSrcArray.length; i += 3) {
  combinedArray.push(...imageSrcArray.slice(i, i + 3));
  combinedArray.push(...imageSrc2Array.slice(i, i + 3));
}

const cardsHTML = combinedArray.map((src, index) => {
  const isFront = Math.floor(index / 3) % 2 === 0;
  return `
    <div class="card">
      <img src="${src}" alt="${isFront ? 'Front' : 'Back'} of card" style="width: 200px; height: 305px;" />
    </div>
  `;
}).join('');

  // Create a container to hold the HTML elements
  const container = document.createElement('div');
  container.innerHTML = cardsHTML;

  // Temporarily append the container to the body
  document.body.appendChild(container);

  // Convert the HTML elements into a canvas
  html2canvas(container).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    // Create a new PDF and add the image
    const pdf = new jsPDF();
    let imgHeight = 300; 
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgHeight, canvas.height * imgHeight / canvas.width);
    heightLeft -= imgHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgHeight, canvas.height * imgHeight / canvas.width);
      heightLeft -= imgHeight;
    }

    // Save the PDF
    pdf.save('cards.pdf');

    // Remove the container from the body
    document.body.removeChild(container);
  });
}