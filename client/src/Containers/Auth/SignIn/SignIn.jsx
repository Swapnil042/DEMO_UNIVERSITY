import React, { useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import classes from './SignIn.module.css';
import Loader from '../../../Components/Loader/Loader';

const SignIn = (props)=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);

    const history = useHistory();
    
    const onLogin=()=>{
        setError('');
        setLoader(true);
        axios.post('http://localhost:5000/signin', {email, password})
            .then(res=>{
                console.log(res.data.user.first_name, res.data.user.last_name);
                
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('first_name', res.data.user.first_name);
                localStorage.setItem('last_name', res.data.user.last_name);
                setLoader(false);
                props.auth(true);
            }).catch(err =>{
                setLoader(false);
                setError(err.response.data.error);
                props.auth(false);
            })
    }
    const onClickSignUp = ()=>{
        history.push('/signup');
    }
    let loginForm = (
        <>
            <div>
                <label>Email</label>
                <input type='text' value={email} onChange={e=>{
                    setEmail(e.target.value);
                }}/>
            </div>
            <div>
                <label>Password</label>
                <input type='Password' value={password} onChange={e=>{
                    setPassword(e.target.value);
                }}/>
            </div>
            <button className={classes.button} onClick={onLogin}>Log In</button>
            <p>Don't have an account? <b className={classes.signup} onClick={onClickSignUp}>Sign Up</b></p>
        </>
    );

    if(loader){
        loginForm = <Loader/>
    }

    return(
        <div className={classes.login}>
            {loginForm}
            {error !== '' ? <p className={classes.invalid}>{error}</p> : null}
        </div>
    )
}

export default SignIn;