import React, { useState } from 'react';
import { postData } from '../service/sendData';
import Button from '../UIKit/Button/Button';
import Input from '../UIKit/Input/Input';
import './LoginForm.scss';
//import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [errors, setErrors] = useState({email: false, password: false});
    //const history = useHistory();

    const checkValidation = (type, value) => {
        if(type === 'email') {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase());
        }
        
        if(type === 'password') {
            const pass = value.replace(/\s/g, '');
            return pass.length > 6;
        }

        return false;
    }

    const setValues = (event) => {
        const {name, value} = event.target;
        const valid = checkValidation(name, value);

        const errs = {...errors};
        errs[name] = !valid;
        setErrors(errs);

        const newData = {...loginData};
        newData[name] = value;
        setLoginData(newData);
    } 

    const submit = () => {
        if(!errors.email && !errors.password) {
            postData('http://example.com/login', loginData).then(() => {
                //history.push('next-page')
            }).catch((err) => alert(err));
        }
    }

    return (
        <div className='login-form'>
            <div className='login-block'>
                <p className='title'>Login Form</p>
                <Input
                    name='email'
                    value={loginData.email}
                    type='email'
                    error={errors.email}
                    errorMessage={'Email is wrong'}
                    onChange={setValues}
                />

                <Input
                    name='password'
                    value={loginData.password}
                    type='password'
                    error={errors.password}
                    errorMessage={'Password is wrong'}
                    onChange={setValues}
                />

                <Button 
                    onClick={submit}
                    disabled={errors.email || errors.password}>
                    submit
                </Button>
            </div>
        </div>
    );
}

export default LoginForm;