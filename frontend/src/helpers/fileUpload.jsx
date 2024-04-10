import React, { useState } from 'react';
import handleFileUpload from './onFileUpload';

const FileUpload = ({ setCards }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Access the file from the event
    if (file) {
      setSelectedFile(file); // Update the selectedFile state
      // Set a message indicating that the file has been added, including the file's name
      setUploadStatus(`${file.name} has been added.`);
    } else {
      // Reset states if no file is selected (e.g., the file selection was cancelled)
      setSelectedFile(null);
      setUploadStatus('');
    }
  };

  const handleUploadClick = async () => {
    if (selectedFile && selectedFile.type === "application/json") {
      setUploadStatus('Uploading...'); // Update the message to indicate that upload is starting
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result; // This is the correct content to parse and upload
        try {
          await handleFileUpload(content, setCards);
          // Update the message to indicate a successful upload, including the file's name
          setUploadStatus(`${selectedFile.name} has been uploaded successfully!`);
        } catch (error) {
          console.error('Upload failed:', error);
          // Update the message to indicate a failed upload
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
        <label htmlFor="file" className="file-upload-button">Velg fil</label>
        <button className="upload-button" onClick={handleUploadClick}>Upload</button>
      </div>
      {/* This div for the upload status message should be outside the button container */}
      {uploadStatus && (
        <div className="upload-status">
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
