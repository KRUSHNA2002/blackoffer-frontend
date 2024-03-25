import React from 'react';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <div className="col-md-12 rounded" style={{border:"2px solid block"}}>
       
          <div className="row">
            <Link className="nav-link" to='#endYear'>endYear</Link>
            <Link className="nav-link" to='#country'>country</Link>
            <Link className="nav-link" to='#pestle'>pestle</Link>
          </div>

    </div>
  )
}

export default MyNavbar
