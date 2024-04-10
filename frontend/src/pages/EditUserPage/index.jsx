import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser, updateUser, deleteUser } from './editUserLogic';
import './style.css'


function EditUserPage() {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  console.log(token);
  const token2 = token.replace(/"/g, ''); 
  const navigate = useNavigate();


  useEffect(() => {
    fetchUser(userId, token2)
      .then(data => {
        console.log(data);
        setUser(data); 
      });
  }, [userId]);

  const handleSubmit = event => {
    event.preventDefault();
    updateUser(userId, user, token2)
      .then(data => {
        console.log(data);

        navigate('/users');
      });
  };

  const handleDelete = () => {
    deleteUser(userId, token2)
      .then(() => {

        navigate('/users');
      });
  };

  // If the user's information hasn't loaded yet, show a loading message
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
  <form onSubmit={handleSubmit} className='edit_form'>
    <div className='names'>
      <label>
        Name:
        <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} />
      </label>
      <label>
        Surname:
        <input type="text" value={user.surname} onChange={e => setUser({...user, surname: e.target.value})} />
      </label>
    </div>
    <label>
      Email:
      <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
    </label>
    <div className="school_info">
      <label className='school_info-long'>
        Department:
        <input type="text" value={user.department} onChange={e => setUser({...user, department: e.target.value})} />
      </label>
      <label className='school_info-long'>
        University:
        <input type="text" value={user.university} onChange={e => setUser({...user, university: e.target.value})} />
      </label>
      <label className='position school_info-short'>
        <p>Position:</p>
        <select value={user.position} onChange={e => setUser({...user, position: e.target.value})}>
          <option value="">Select...</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="teacher assistant">Teacher Assistant</option>
        </select>
      </label>
    </div>
    <div className="buttons">
      <button className='red' type="button" onClick={handleDelete}>Delete</button>
      <button className='white' type="button" onClick={() => navigate('/users')}>Cancel</button>
      <button type="submit">Save</button>
    </div>
    

  </form>
  );
}

export default EditUserPage;