const handleFileUpload = async (content, setCards) => {
  try {
    const cards = JSON.parse(content); // Assuming this is an array of cards
    const response = await fetch('/api/cards/bulk', { // Make sure this matches your actual endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cards }), // Ensure the backend expects this format
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const uploadedCards = await response.json(); // Expecting the backend to return the uploaded cards
    setCards(uploadedCards); // Update the state with the newly uploaded cards
  } catch (error) {
    console.error('Error during file upload:', error);
  }
};

export default handleFileUpload;