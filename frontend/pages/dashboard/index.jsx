import StatCounter from '../components/StatCounter/';
import './style.css'
function Dashboard() {

  return (
        <div className="content-wrapper">
            <h1 className="title">Dashboard</h1>
            <StatCounter title={"Total cards available"} number={93}/>
            <StatCounter title={"Total cards available"} number={93}/>
            <StatCounter title={"Total cards available"} number={93}/>
            <StatCounter title={"Total cards available"} number={93}/>
        </div>
  );
}

export default Dashboard;