import React from 'react';
import './spinner.css';

function Spinner() {
    return (
        <div className='spinner'>
            <span className="loader"></span>
            <h4>Загрузка...</h4>
        </div>
    );
}

export default Spinner;