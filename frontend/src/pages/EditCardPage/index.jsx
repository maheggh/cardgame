import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleCard, updateCard, deleteCard } from '../../API/cards';
import './style.css';

function EditCardPage() {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  // Fetch card data on component mount
  useEffect(() => {
    console.log('useEffect called with cardId:', cardId);
    if (cardId) {
      console.log('Fetching card data for cardId:', cardId);
      getSingleCard(cardId)
        .then(data => {
          console.log('Fetched card data:', data);
          setCard(data);
        })
        .catch(error => console.error('Error fetching card:', error));
    } else {
      console.log('No cardId found in useEffect');
    }
  }, [cardId]); // UseEffect dependency array only depends on cardId

  // Handle form submission
  const handleSubmit = event => {
    event.preventDefault();
    if (cardId && card) {
      updateCard(cardId, card)
        .then(data => {
          console.log('Updated card data:', data);
          navigate('/cards');
        })
        .catch(error => console.error('Error updating card:', error));
    }
  };

  // Handle delete button click
  const handleDelete = () => {
    if (cardId) {
      deleteCard(cardId)
        .then(() => {
          console.log('Card deleted');
          navigate('/cards');
        })
        .catch(error => console.error('Error deleting card:', error));
    }
  };

  // Show a loading message if card data is not yet loaded
  if (!card) {
    console.log('Card data is not yet loaded');
    return <div>Loading...</div>;
  }

  // Card edit form
  return (
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
        <button className='red' type="button" onClick={handleDelete}><i className="fa-solid fa-trash"/>Delete</button>
        <button className='white' type="button" onClick={() => navigate('/cards')}>Cancel</button>
        <button type="submit"><i className="fa-solid fa-floppy-disk"/>Save</button>
      </div>
    </form>
  );
}

export default EditCardPage;
