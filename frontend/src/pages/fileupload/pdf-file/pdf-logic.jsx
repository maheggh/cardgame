import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function generatePDF() {
  // Retrieve cards from local storage
  const cards = JSON.parse(localStorage.getItem('FAVOURITE_CARDS_LIST_STORE')) || [];

  const cardsHTML = cards.map((card) => {
    const imageSrc = `./assets/cards-png/SUPER cards poker size ${ "061123" + (card['card-id']*2-1)}.png`;
    const imageSrc2 = `./assets/cards-png/SUPER cards poker size ${ "061123" + (card['card-id']*2)}.png`;
    return `
      <div class="card">
        <img src="${imageSrc}" alt="Front of card" style="width: 200px; height: 300px;" />
        <img src="${imageSrc2}" alt="Back of card" style="width: 200px; height: 300px;" />
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
    let imgHeight = 210; // A4 size in mm
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