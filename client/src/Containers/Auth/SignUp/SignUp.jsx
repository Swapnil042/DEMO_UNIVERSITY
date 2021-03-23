import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';

import classes from './SignUp.module.css';
import Loader from '../../../Components/Loader/Loader';
import axios from 'axios';
import {checkSignUpInput} from '../../../utility';

const SignUp = (props)=>{
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState('');

    const history = useHistory();
    let check = null;
    const onSignUp = ()=>{
        check = checkSignUpInput({first_name, last_name, email, password});
        if(check.isValid){
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
                    setError(err.response.data);
                    setLoader(false);
                })
        }else{
            setError(check);
        }
    }

    const onClickLogin = ()=>{
        history.push('/login');
    }

    let signUpForm = (
        <div>
            <div className={classes.inputDiv}>
                <div className={classes.labelDiv} >
                    <label>First Name</label>
                </div>
                <div className={classes.inDiv}>
                    <input type='text' value={first_name} onChange={e=>{
                        setFirst_name(e.target.value);
                    }}/>
                    {error.firstNameError ? <p className={classes.invalid}>{error.firstNameError}</p>:null}
                </div>
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.labelDiv}>
                    <label>Last Name</label>
                </div>
                <div className={classes.inDiv}>
                    <input type='text' value={last_name} onChange={e=>{
                        setLast_name(e.target.value);
                    }}/>
                    {error.lastNameError ? <p className={classes.invalidr}>{error.lastNameError}</p>:null}
                </div>
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.labelDiv}>
                    <label>Email</label>
                </div>
                <div className={classes.inDiv}>
                    <input type='text' value={email} onChange={e=>{
                        setEmail(e.target.value);
                    }}/>
                    {error.emailError ? <p className={classes.invalid}>{error.emailError}</p>:null}
                </div>
            </div>
            <div className={classes.inputDiv}>
                <div className={classes.labelDiv}>
                    <label>Password</label>
                </div>
                <div className={classes.inDiv}>
                    <input type='Password' value={password} onChange={e=>{
                        setPassword(e.target.value);
                    }}/>
                    {error.passError ? <p className={classes.invalid}>{error.passError}</p>:null}
                </div>
            </div>
            <button className={classes.button} onClick={onSignUp}>Sign Up</button>
            <p>Already have an account? <b className={classes.login} onClick={onClickLogin}>Log In</b></p>
        </div>
    );

    if(loader){
        signUpForm = <Loader/>
    }
    return(
        <div className={classes.signUp}>
            {signUpForm}
            {error.error ? <p className={classes.invalid}>{error.error}</p>:null}
            {success !== '' ? <p className={classes.success}>{success}</p>: null}
        </div>
    )
}

export default SignUp;