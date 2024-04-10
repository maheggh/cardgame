import StatCounter from '../../components/StatCounter/';
import { useEffect, useState } from 'react';
import { authorize } from '../../api/api.js';
import { useAuth } from '../../UserContext.jsx';
import './style.css'
function Dashboard() {
  const [data, setData] = useState('');
  const [infocards, setInfocards] = useState([]);
  const { token } = useAuth();

    useEffect(() => {
        const getAllCards = async () => {
            try {
              const allCards = await authorize(token);
                setData(allCards)
            } catch (err) {
                console.log(err);
            }

        }

        const countUniquePositions = (items) => {
          const uniquePositions = {};

          items.forEach(item => {
              uniquePositions[item['card-type']] = true;
          });

          return Object.keys(uniquePositions).length;
      };
        getAllCards()
        
    }, [])

  return (
        <div className="content-wrapper">
            <h1 className="title">Dashboard</h1>
            <StatCounter title={"Total cards available"} number={Object.keys(data).length}/>
            <StatCounter title={"Card types available"} number={93}/>
            <StatCounter title={"Total cards available"} number={93}/>
            <StatCounter title={"Total cards available"} number={93}/>
        </div>
  );
}

export default Dashboard;