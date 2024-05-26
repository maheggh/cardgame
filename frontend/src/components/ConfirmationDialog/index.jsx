import React from 'react';
import './style.css';

function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog-content">
        <p>{message}</p>
        <div className="confirmation-dialog-buttons">
          <button className="confirm-button" onClick={onConfirm} tabIndex="1">Yes</button>
          <button className="cancel-button" onClick={onCancel} tabIndex="1">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;
