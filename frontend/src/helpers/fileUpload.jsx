import React, { useState } from 'react';
import handleFileUpload from './onFileUpload';
import { useAuth } from '../UserContext';

const FileUpload = ({ setCards }) => {
  let { token } = useAuth(); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [deleteCardId, setDeleteCardId] = useState('');

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



  const handleDeleteClick = async () => {
    
    try {
      console.log(deleteCardId);
      token = token.replace(/"/g, '');
      console.log(token);
      const response = await fetch(`http://localhost:3000/cards/${deleteCardId}`, {
        method: 'DELETE',
        headers: {
          'auth-token': `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        // Clone the response for safe multiple readings
        const clonedResponse = response.clone();
  
        try {
          const errorResult = await clonedResponse.json(); // First attempt to parse as JSON
          throw new Error(errorResult.message || 'Failed to delete the card.');
        } catch {
          // If parsing as JSON fails, treat as text
          const errorText = await response.text(); // Use the original response here
          throw new Error(errorText || 'Failed to delete the card.');
        }
      }
  
      // If response is OK, update the status accordingly
      setUploadStatus(`Card with ID ${deleteCardId} has been deleted successfully.`);
    } catch (error) {
      console.error('Deletion failed:', error);
      setUploadStatus(`Deletion failed: ${error.message}`);
    }
  };
  
  
  
  return (
    <div className="file-upload">
      <div className="file-upload-button-container">
        <input type="file" id="file" className="file-input" onChange={handleFileChange} accept=".json" />
        <label htmlFor="file" className="button file-upload-button">Velg fil</label>
        <button className="button upload-button" onClick={handleUploadClick}>Upload</button>
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
          Delete Card
        </button>
      </div>
      {uploadStatus && <div className="upload-status"><p>{uploadStatus}</p></div>}
    </div>
  );
};
export default FileUpload;
