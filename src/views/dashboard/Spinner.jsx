import React from 'react';

const Spinner = () => {
    return (
        <div className='h-75 w-100 shadow d-flex justify-content-center ' style={{marginBottom:"200px"}}>
            
            <div style={{marginTop:'200px'}} >
                    <div className="spinner-grow text-dark"  role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
            </div>
        </div>
    );
};

export default Spinner;
