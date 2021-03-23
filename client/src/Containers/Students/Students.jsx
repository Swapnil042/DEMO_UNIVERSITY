import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

import classes from './Students.module.css';
import StudentTable from './StudentTable/StudentTable';
import Loader from '../../Components/Loader/Loader';


const Students = (props)=>{
    const[students, setStudents] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();

    const onStudentCreate = ()=>{
        history.push('/student/create');
    }
 
    useEffect(()=>{
        setLoader(true);
        setError('');
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/student',{
            headers: {Authorization: `Bearer ${token}`}
        }).then(res =>{
            setStudents(res.data.students);
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

    let studentTable = (
        <>
            <button className={classes.button} onClick={onStudentCreate}>Add Student <b>+</b></button>
            <StudentTable allstudents={students}/>;
        </>
    );
    if(loader){
        studentTable = <Loader/>
    }
    return(
        <div className={classes.student}>
            <h3>Students :</h3>
            {error !== '' ? <p className={classes.error}>{error}</p> : <>{studentTable}</> }
        </div>
    )
}
export default Students;