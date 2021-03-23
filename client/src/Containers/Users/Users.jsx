import React,{useEffect, useState} from 'react';
import axios from 'axios';

import classes from './Users.module.css';
import UserTable from './UserTable/UserTable';
import Loader from '../../Components/Loader/Loader';


const Users = (props)=>{
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        setLoader(true);
        setError('');
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/alluser',{
            headers: {Authorization: `Bearer ${token}`}
        }).then(res =>{
            setUsers(res.data.users);
            setLoader(false);
        }).catch(err=>{
            if(err.response.statusText){
                setError(err.response.statusText);
            }else{
                setError(err.response.data.error);
            }
            setLoader(false);
        })
    },[]);

    let userTable = null;
    if(error === ''){
        userTable = <UserTable allusers={users}/>
    }
    if(loader){
        userTable = <Loader/>
    }

    return(
        <div className={classes.user}>
            <h3>Users :</h3>
            {error !== '' ? <p className={classes.error}>{error}</p> : <>{userTable}</> }
        </div>
    )
}
export default Users;