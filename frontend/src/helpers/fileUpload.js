import React, { useState } from 'react';
import handleFileUpload from './onFileUpload';

// Assuming setCards is passed to this component to update the state after upload
const FileUpload = ({ setCards }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleUploadClick = async () => {
    if (selectedFile && selectedFile.type === "application/json") {
      setUploadStatus('Uploading...');
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result; // This is the correct content to parse and upload
        try {
          // Call handleFileUpload with the file's content as text and the setCards function
          await handleFileUpload(content, setCards);
          setUploadStatus('Upload successful!');
        } catch (error) {
          console.error('Upload failed:', error);
          setUploadStatus('Upload failed.');
        }
      };
      reader.readAsText(selectedFile); // This correctly reads the file's content as text
    } else {
      alert("Please upload a valid JSON file.");
    }
  };

  return (
    <div className="file-upload">
      <div className="file-upload-button-container">
        <input 
          type="file" 
          id="file" 
          className="file-input" 
          onChange={handleFileChange} 
          accept=".json" 
        />
        <label htmlFor="file" className="file-upload-button">
          Velg fil
        </label>
        <button 
          className="upload-button" 
          onClick={handleUploadClick}
        >
          Upload
        </button>
      </div>
      {/* This div for the upload status message should be outside the button container */}
      {uploadStatus && (
        <div className="upload-status">
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
