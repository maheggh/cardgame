import StatCounter from '../../components/StatCounter/';
import { useEffect, useState } from 'react';
import { authorize } from '../../api/api.js';
import './style.css'
function Dashboard() {
  const [data, setData] = useState('');
  const [infocards, setInfocards] = useState([]);

    useEffect(() => {
        const getAllCards = async () => {
            try {
              const allCards = await authorize("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE0MWEzNTllOTgwMWNmNTc5NzAzNDciLCJpYXQiOjE3MTI2ODgxNzUsImV4cCI6MTcxMjY4OTA3NX0.QeCek5tJ50Bgze2CmJ3m626a8UrHLRvzMdOhyMlMnn4");
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