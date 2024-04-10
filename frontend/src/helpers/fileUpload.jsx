import React, { useState } from 'react';
import handleFileUpload from './onFileUpload';

const FileUpload = ({ setCards }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [deleteCardId, setDeleteCardId] = useState(''); // State to hold the ID of the card to delete

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
      const response = await fetch(`http://localhost:3000/cards/${deleteCardId}`, { method: 'DELETE' });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(`Card with ID ${deleteCardId} has been deleted successfully.`);
        // Optionally refresh the list of cards here if needed
      } else {
        throw new Error('Failed to delete the card.');
      }
    } catch (error) {
      console.error('Deletion failed:', error);
      setUploadStatus('Deletion failed.');
    }
  };

  return (
    <div className="file-upload">
      <div className="file-upload-button-container">
        <input type="file" id="file" className="file-input" onChange={handleFileChange} accept=".json" />
        <label htmlFor="file" className="file-upload-button">Velg fil</label>
        <button className="upload-button" onClick={handleUploadClick}>Upload</button>
        {/* Input and button for deleting a card by ID */}
        <input type="text" placeholder="Enter Card ID to delete" value={deleteCardId} onChange={(e) => setDeleteCardId(e.target.value)} />
        <button onClick={handleDeleteClick}>Delete Card</button>
      </div>
      {uploadStatus && <div className="upload-status"><p>{uploadStatus}</p></div>}
    </div>
  );
};

export default FileUpload;
