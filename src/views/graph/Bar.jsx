import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Spinner from '../dashboard/Spinner';

const Bars = () => {
  const [originalInsights, setOriginalInsights] = useState([]);
  const [filteredInsights, setFilteredInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    country: ''
  });

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://blackoffer-backend.vercel.app/api/insights');
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
        filters.country === '' || insight.country === filters.country
      );
    });

    setFilteredInsights(newFilteredInsights);
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}><Spinner /></div>; 

  if (error) return <p>Error: {error}</p>;

  // Prepare data for Highcharts
  const chartOptions = {
    title: {
      text: 'Data Visualization Dashboard '
    },
    xAxis: {
      categories: filteredInsights.map(insight => insight.pestle),
      title: {
        text: 'pestle'
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
    <div id='country'>
      {/* Filter inputs */}
      <div className="row mt-5 mb-5 d-flex justify-content-center">
        <div className="col-md-6 col-12">
          <h4 className="col-md-12 text-center text-secondary">Filter by Country:</h4>
          <div className="col-md-12">

            <select className='form-control text-center' onChange={handleFilterChange} name="country" id="country">
               <option>Tap to country for filter Data</option>

              {[...new Set(originalInsights.map(item => item.country))].map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>

          </div>
          <div className="col-md-12 text-center">
            <button className="mt-2 btn btn-outline-primary rounded" onClick={applyFilters}>Apply Filter</button>
          </div>
        </div>
      </div>

      {/* Render the Highcharts chart */}
      <div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
};

export default Bars;
