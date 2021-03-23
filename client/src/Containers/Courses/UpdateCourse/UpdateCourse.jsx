import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import {checkCourseInput} from '../../../utility';
import Loader from '../../../Components/Loader/Loader';
import Form from '../../../Components/Form/Form'

const UpdateCourse = (props)=>{
    const [course_id, setCourse_id] = useState('');
    const [course_title, setCourse_title] = useState('');
    const [course_description, setCourse_description] = useState('');
    const [course_price, setCourse_price] = useState('');
    const [course_rating, setCourse_rating] = useState('');
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();
    const { id } = useParams();

    const allState = [["Course Id", course_id, setCourse_id, error.idError], ["Course Title",course_title, setCourse_title, error.titleError], 
                      ["Course Description", course_description, setCourse_description, error.descriptionError],
                      ["Course Price",course_price, setCourse_price, error.priceError], ["Course Rating", course_rating, setCourse_rating, error.ratingError]];

    useEffect(()=>{
        setLoader(true);
        setError('');
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:5000/course/${id}`,{
                headers: {Authorization: `Bearer ${token}`}
        }).then(res =>{
            setLoader(false);
            setCourse_id(res.data.course_id);
            setCourse_title(res.data.course_title);
            setCourse_description(res.data.course_description);
            setCourse_price(res.data.course_price);
            setCourse_rating(res.data.course_rating);
        }).catch(err=>{
            if(err.response.data){
                setError(err.response.data);
            }else{
                setError(err.response.statusText);
            }
            setLoader(false);
        })
    },[id]);

    let check = null;
    const onCourseUpdate = ()=>{
        check = checkCourseInput({course_id, course_title, course_description, course_price, course_rating});
        if(check.isValid){
            setLoader(true);
            setError('');
            const token = localStorage.getItem('token');
            axios.patch(`http://localhost:5000/course/${id}`,{
                course_id, course_description, course_title, course_price, course_rating 
            },{
                headers: {Authorization: `Bearer ${token}`}
            }).then(res =>{
                setLoader(false);
                alert(res.data.message);
                history.push('/courses');
            }).catch(err=>{
                if(err.response.data){
                    setError(err.response.data);
                }else{
                    setError(err.response.statusText);
                }
                setLoader(false);
            })
        }else{
            setError(check);
        }
    }
    let courseUpdateForm = <Form allState={allState}
                                action = {onCourseUpdate}
                                actionName = "Update Course"
                                error = {error} />
    if(loader){
        courseUpdateForm = <Loader/>
    }
    return(
        <>
            {courseUpdateForm}
        </>
    )
}
export default UpdateCourse;