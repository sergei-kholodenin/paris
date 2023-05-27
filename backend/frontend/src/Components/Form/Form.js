import React from 'react';

import './form.css';

function Form({children}) {
    return (
        
        <form className="form-container">
            {children}
        </form>
        
        
    );
}

export default Form;