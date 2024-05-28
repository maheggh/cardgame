// Importing necessary hooks and functions
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleCard, updateCard, deleteCard } from '../../API/cards';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import './style.css';

function EditCardPage() {
  // Getting the cardId from the URL parameters
  const { cardId } = useParams();
  // Setting up state for the card data and the confirmation dialog
  const [card, setCard] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  // Setting up navigation
  const navigate = useNavigate();

  // Fetching the card data when the component mounts
  useEffect(() => {
    if (cardId) {
      getSingleCard(cardId).then(data => {
        setCard(data);
      }).catch(error => console.error('Error fetching card:', error));
    }
  }, [cardId]);

  // Handling form submission
  const handleSubmit = event => {
    event.preventDefault();
    if (cardId && card) {
      updateCard(cardId, card).then(data => {
        navigate('/cards');
      }).catch(error => console.error('Error updating card:', error));
    }
  };

  // Handling card deletion
  const handleDelete = () => {
    if (cardId) {
      deleteCard(cardId).then(() => {
        navigate('/cards');
      }).catch(error => console.error('Error deleting card:', error));
    }
  };

  // Showing the confirmation dialog
  const handleShowConfirmDialog = () => {
    setShowConfirmDialog(true);
  };

  // Confirming card deletion
  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    handleDelete();
  };

  // Canceling card deletion
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  // If the card data is not loaded yet, show a loading message
  if (!card) {
    return <div>Loading...</div>;
  }

  // Rendering the component
  return (
    <div>
      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this card?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <form onSubmit={handleSubmit} className='edit_form'>
        <label>
          ID:
          <input type="text" value={card['card-id']} onChange={e => setCard({ ...card, 'card-id': e.target.value })} />
        </label>
        <label>
          Type:
          <input type="text" value={card['card-type']} onChange={e => setCard({ ...card, 'card-type': e.target.value })} />
        </label>
        <label>
          Category:
          <input type="text" value={card['card-category']} onChange={e => setCard({ ...card, 'card-category': e.target.value })} />
        </label>
        <label>
          Name:
          <input type="text" value={card['card-name']} onChange={e => setCard({ ...card, 'card-name': e.target.value })} />
        </label>
        <label>
          Description: <br/>
          <textarea value={card['card-description']} onChange={e => setCard({ ...card, 'card-description': e.target.value })} />
        </label>
        <label>
          Details: <br/>
          <textarea value={card['card-details']} onChange={e => setCard({ ...card, 'card-details': e.target.value })} />
        </label>
        <div className="buttons">
          <button className='red' type="button" onClick={handleShowConfirmDialog}><i className="fa-solid fa-trash"/> Delete</button>
          <button className='white' type="button" onClick={() => navigate('/cards')}>Cancel</button>
          <button type="submit"><i className="fa-solid fa-floppy-disk"/> Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditCardPage;
