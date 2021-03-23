import React,{useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const Logout = (props)=>{
    useEffect(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        props.auth(false);
    },[props]);

    return(
        <Redirect to = "/"/>
    )
}
export default Logout;