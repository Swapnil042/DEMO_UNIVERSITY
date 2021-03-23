import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


import classes from './Courses.module.css';
import CourseTable from './CourseTable/CourseTable';
import Loader from '../../Components/Loader/Loader';

const Courses = (props)=>{
    const[courses, setCourses] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();

    const onCourseCreate = ()=>{
        history.push('/course/create');
    }

    useEffect(()=>{
        setLoader(true);
        setError('');
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5000/course',{
            headers: {Authorization: `Bearer ${token}`}
        }).then(res =>{
            setCourses(res.data.course);
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

    
    let courseTable = (
        <>
            <button className={classes.button} onClick={onCourseCreate}>Add Course <b>+</b></button>
            <CourseTable allcourses={courses}/>;
        </>
    );
    
    if(loader){
        courseTable = <Loader/>
    }
    
    return(
        <div className={classes.course}>
            <h3>Courses :</h3>
            {error !== '' ? <p className={classes.error}>{error}</p> : <>{courseTable}</> }
        </div>
    )
}
export default Courses;