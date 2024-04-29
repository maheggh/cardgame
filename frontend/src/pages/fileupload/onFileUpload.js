const handleFileUpload = async (content, setCards) => {
  try {
    const cards = JSON.parse(content);
    const response = await fetch('http://localhost:3000/api/cards/bulk', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cards }), 
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const uploadedCards = await response.json(); 
    setCards(uploadedCards); // Update the state with the newly uploaded cards
  } catch (error) {
    console.error('Error during file upload:', error);
  }
};

export default handleFileUpload;