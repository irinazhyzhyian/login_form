import React from 'react';
import './Input.scss';

const Input = ({value, onChange, error, errorMessage, type, name, placeholder}) => {
    return (
        <div className='input-field'>
            <input
                name={name}
                className={`input ${error && 'error'}`}
                type={type ? type: 'text'}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
            {error && <p className='error-message'>{errorMessage}</p>}
        </div>
    );
}

export default Input;