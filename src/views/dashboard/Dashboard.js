import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bars from '../graph/Bar';
import Industry_filter from '../graph/Industry_filter';
import Spinner from './Spinner';

const Dashboard = () => {
  const [originalInsights, setOriginalInsights] = useState([]);
  const [filteredInsights, setFilteredInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/insights');
        setOriginalInsights(response.data);
        setFilteredInsights(response.data); // Initialize filtered data with original data
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let newFilteredInsights = originalInsights.filter(insight => {
      return (
        (filters.endYear === '' || insight.end_year === parseInt(filters.endYear))
        && (filters.topics === '' || insight.topic === filters.topics)
        && (filters.sector === '' || insight.sector === filters.sector)
        && (filters.region === '' || insight.region === filters.region)
        && (filters.pest === '' || insight.pest === filters.pest)
        && (filters.source === '' || insight.source === filters.source)
        && (filters.swot === '' || insight.swot === filters.swot)
        && (filters.country === '' || insight.country === filters.country)
        && (filters.city === '' || insight.city === filters.city)
      );
    });

    setFilteredInsights(newFilteredInsights);
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><Spinner /></div>; 
  if (error) return <p>Error: {error}</p>;

  // Prepare data for Highcharts
  const chartOptions = {
    title: {
      text: 'Data Visualization Dashboard'
    },
    xAxis: {
      categories: filteredInsights.map(insight => insight.end_year),
      title: {
        text: 'Year'
      }
    },
    yAxis: {
      title: {
        text: 'Count'
      }
    },
    series: [
      {
        name: 'Insight Count',
        data: filteredInsights.map(insight => insight.intensity)
      }
    ]
  };

  return (
    <><div>
      {/* <h1 className='text-center'>Data Visualization Dashboard</h1> */}
      <div>
        <div className='row mt-5 mb-5 d-flex justify-content-center'>
          <div className="col-md-6 col-12">
            <h6 className="col-md-12 text-center">Enter the Year for searching data </h6>

            
            <select className='form-control text-center' onChange={handleFilterChange} name="endYear" id="endYear">
               <option>Tap to Year for filter Data</option>

              {[...new Set(originalInsights.map(item => item.end_year))].map((endYear, index) => (
                <option key={index} value={endYear}>{endYear}</option>
              ))}
            </select>

            <div className="col-md-12 text-center"><button className=' mt-2 btn btn-outline-primary rounded ' onClick={applyFilters}>Filter Data</button></div>
          </div>
        </div>

      </div>
      <div>
        {/* Render the Highcharts chart */}
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
    
    <Bars/>
    <Industry_filter/>

    </>
  );
};

export default Dashboard;
