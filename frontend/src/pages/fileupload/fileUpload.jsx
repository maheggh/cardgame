import React, { useState } from 'react';
import handleFileUpload from './onFileUpload';
import { useAuth } from '../../components/PrivateRoute/UserContext.jsx';



const FileUpload = ({ setCards }) => {

  let { token } = useAuth(); 
  

  // State for selected file, upload status, and card ID to delete
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [deleteCardId, setDeleteCardId] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus(`${file.name} has been added.`);
    } else {
      setSelectedFile(null);
      setUploadStatus('');
    }
  };

  // Handle file upload
  const handleUploadClick = async () => {
    if (selectedFile && selectedFile.type === "application/json") {
      setUploadStatus('Uploading...');
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;
        try {
          await handleFileUpload(content, setCards);
          setUploadStatus(`${selectedFile.name} has been uploaded successfully!`);
        } catch (error) {
          console.error('Upload failed:', error);
          setUploadStatus('Upload failed.');
        }
      };
      reader.readAsText(selectedFile);
    } else {
      alert("Please upload a valid JSON file.");
    }
  };


// Handle card deletion
const handleDeleteClick = async () => {
  token = token.replace(/"/g, ''); 
  try {
    const response = await fetch(`http://localhost:3000/cards/${deleteCardId}`, { 
      method: 'DELETE',
      headers: {
        'auth-token': `Bearer ${token}`, // Add this line
      },
    });
    if (response.ok) {
      setUploadStatus(`Card with ID ${deleteCardId} has been deleted successfully.`);
    } else {
      throw new Error('Failed to delete the card.');
    }
  } catch (error) {
    console.error('Deletion failed:', error);
    setUploadStatus(`Deletion failed: ${error.message}`);
  }
};

  const handleToggleFavorite = (cardId) => {
    setFavoriteCardIds(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId); 
      } else {
        return [...prev, cardId]; 
      }
    });
  };
  
  
  // Render file upload form
  return (
    <div className="file-upload">
      <div className="file-upload-button-container">
        <input type="file" id="file" className="file-input" onChange={handleFileChange} accept=".json" />
        <label htmlFor="file" className="button upload-button"><i className="fa-solid fa-file-import"/>Velg fil</label>
        <button className="button upload-button" onClick={handleUploadClick}><i className="fa-solid fa-arrow-up-from-bracket"/>Upload</button>
      </div>
      <div className="delete-card-input-container">
        <input 
          type="text" 
          className="delete-card-input" 
          placeholder="Enter Card ID to delete" 
          value={deleteCardId} 
          onChange={(e) => setDeleteCardId(e.target.value)}
        />
        <button className="button delete-card-button" onClick={handleDeleteClick}>
          <i className="fa-solid fa-trash"/>
          Delete Card 
        </button>
      </div>
      {uploadStatus && <div className="upload-status"><p>{uploadStatus}</p></div>}
    </div>
  );
};
export default FileUpload;
