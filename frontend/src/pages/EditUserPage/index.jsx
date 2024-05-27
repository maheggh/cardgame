import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser, updateUser, deleteUser } from '../../API/users';
import ErrorMessage from '../../components/ErrorMessage';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import './style.css';

function EditUserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setIsLoading(false);
    });
  }, [userId]);

  const handleSubmit = event => {
    event.preventDefault();
    updateUser(userId, user).then(data => {
      navigate('/users');
    });
  };

  const handleDelete = () => {
    deleteUser(userId).then(() => {
      navigate('/users');
    });
  };

  const handleShowConfirmDialog = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    handleDelete();
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  if (user===null) {
    return (<div className="content-wrapper"><p>Loading...</p></div>);
  }

  if (user===undefined){
    return (<div className="content-wrapper"><ErrorMessage error="401" subtitle="Unauthorized" text="Sorry, you need to be authorized to access this information"/></div>);
  }

  return (
    <div>
      {showConfirmDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <form onSubmit={handleSubmit} className='edit_form'>
        <div className='names'>
          <label>
            Name:
            <input type="text" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
          </label>
          <label>
            Surname:
            <input type="text" value={user.surname} onChange={e => setUser({ ...user, surname: e.target.value })} />
          </label>
        </div>
        <label>
          Email:
          <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
        </label>
        <div className="school_info">
          <label className='school_info-long'>
            Department:
            <input type="text" value={user.department} onChange={e => setUser({ ...user, department: e.target.value })} />
          </label>
          <label className='school_info-long'>
            University:
            <input type="text" value={user.university} onChange={e => setUser({ ...user, university: e.target.value })} />
          </label>
          <label className='position school_info-short'>
            <p>Position:</p>
            <select value={user.position} onChange={e => setUser({ ...user, position: e.target.value })}>
              <option value="">Select...</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="teacher assistant">Teacher Assistant</option>
            </select>
          </label>
        </div>
        <div className="buttons">
          <button className='red' type="button" onClick={handleShowConfirmDialog}><i className="fa-solid fa-trash"/> Delete</button>
          <button className='white' type="button" onClick={() => navigate('/users')}>Cancel</button>
          <button type="submit"><i className="fa-solid fa-floppy-disk"/> Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditUserPage;
