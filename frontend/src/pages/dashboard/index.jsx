import StatCounter from '../../components/StatCounter/';
import { useEffect, useState } from 'react';
import { authorize } from '../../api/api.js';
import './style.css'
function Dashboard() {
  const [data, setData] = useState('');
  const [cards, setCards] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
              const data = await authorize("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE0MWEzNTllOTgwMWNmNTc5NzAzNDciLCJpYXQiOjE3MTI2ODU1MDgsImV4cCI6MTcxMjY4NjQwOH0.yg9Xb6JRsYgTZG2u4YJeBixROO864fw2F86Ek9cwFwk");
                setData(data)
            } catch (err) {
                console.log(err);
            }
        }
        getAllUsers()
        console.log(data);
    }, [])

  return (
        <div className="content-wrapper">
            <h1 className="title">Dashboard</h1>
            <StatCounter title={"Total cards available"} number={Object.keys(data).length}/>
            <StatCounter title={"Total cards available"} number={93}/>
            <StatCounter title={"Total cards available"} number={93}/>
            <StatCounter title={"Total cards available"} number={93}/>
        </div>
  );
}

export default Dashboard;