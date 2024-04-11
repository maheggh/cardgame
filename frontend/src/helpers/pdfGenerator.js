import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// Function to dynamically create a card element based on card data
const createCardElementForPDF = (cardData) => {
    const cardElement = document.createElement('div');
    cardElement.style.cssText = `width: 210mm; min-height: 297mm; border: 1px solid #000; margin: 10px; padding: 10px; page-break-after: always;`;
    cardElement.innerHTML = `
        <h4>${cardData['card-type']}: ${cardData['card-name']}</h4>
        <p>${cardData['card-description']}</p>
        <p>Color: ${cardData['card-color']}</p>
    `;
    // More styling or elements can be added here as needed
    return cardElement;
};

// Main function to generate a PDF document from the favorite cards
const generatePDF = async (favoriteCardsData) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    // Temporary container for rendering card elements off-screen
    const cardsContainer = document.createElement('div');
    cardsContainer.style.visibility = 'hidden';
    document.body.appendChild(cardsContainer);

    for (const cardData of favoriteCardsData) {
        const cardElement = createCardElementForPDF(cardData);
        cardsContainer.appendChild(cardElement);

        // Ensure the card element is rendered in the DOM before capturing
        await html2canvas(cardElement, { scale: 1 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 0, 0, 210, 297); // Adjust dimensions as needed
            if (favoriteCardsData.indexOf(cardData) < favoriteCardsData.length - 1) {
                doc.addPage(); // Add a new page if there are more cards to process
            }
        });

        // Cleanup: remove the card element after capturing
        cardsContainer.removeChild(cardElement);
    }

    // Save the generated PDF
    doc.save('favorite-cards.pdf');

    // Remove the temporary container from the document
    document.body.removeChild(cardsContainer);
};

export { generatePDF };
