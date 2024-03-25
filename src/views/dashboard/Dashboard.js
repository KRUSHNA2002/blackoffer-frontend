import 'bootstrap/dist/css/bootstrap.min.css';
import Bars from '../graph/Bar';
import IndustryFilter from '../graph/IndustryFilter';
import YearFilter from '../graph/YearFilter';
// import { BrowserRouter as ROuter , Routes ,Route } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
    <YearFilter/>
    <br></br>
    <Bars/>
    <br></br>
    <IndustryFilter/>

    

    </>
  );
};

export default Dashboard;
