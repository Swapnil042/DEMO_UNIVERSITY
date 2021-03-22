import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';

import classes from './SignUp.module.css';
import Loader from '../../../Components/Loader/Loader';
import axios from 'axios';

const SignUp = (props)=>{
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState('');

    const history = useHistory();

    const onSignUp = ()=>{
        setSuccess('');
        setError('');
        setLoader(true);
        axios.post('http://localhost:5000/signup', {first_name, last_name, email, password})
            .then(res=>{
                setLoader(false);
                setSuccess(res.data.message);
                setFirst_name('');
                setLast_name('');
                setEmail('');
                setPassword('');
            }).catch(err=>{
                console.log(err.response.data.error);
                setError(err.response.data.error);
                setLoader(false);
            })
    }

    const onClickLogin = ()=>{
        history.push('/login');
    }

    let signUpForm = (
        <>
            <div>
                <label>First Name</label>
                <input type='text' value={first_name} onChange={e=>{
                    setFirst_name(e.target.value);
                }}/>
            </div>
            <div>
                <label>Last Name</label>
                <input type='text' value={last_name} onChange={e=>{
                    setLast_name(e.target.value);
                }}/>
            </div>
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
            <button className={classes.button} onClick={onSignUp}>Sign Up</button>
            <p>Already have an account? <b className={classes.login} onClick={onClickLogin}>Log In</b></p>
        </>
    );

    if(loader){
        signUpForm = <Loader/>
    }
    return(
        <div className={classes.signUp}>
            {signUpForm}
            {error !== '' ? <p className={classes.invalid}>{error}</p>:null}
            {success !== '' ? <p className={classes.success}>{success}</p>: null}
        </div>
    )
}

export default SignUp;