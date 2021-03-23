import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

import {checkStudentInput} from '../../../utility';
import Loader from '../../../Components/Loader/Loader';
import Form from '../../../Components/Form/Form'

const UpdateStudent= ()=>{
    const [name, setName] = useState('');
    const [student_id, setStudent_id] = useState('');
    const [university_name, setUniversity_name] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [grade_level, setGrade_level] = useState('');

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();
    const { id } = useParams();
    let check = null;
    
    const allState = [["Name", name, setName, error.nameError], ["ID", student_id, setStudent_id, error.idError], ['University Name', university_name, setUniversity_name, error.universityError],
                        ["Phone", phone_number, setPhone_number, error.phoneError], ["Email", email, setEmail, error.emailError],
                        ["Address", address, setAddress, error.addressError], ["City", city, setCity, error.cityError],
                        ["Country", country, setCountry, error.countryError], ["Grade Level", grade_level, setGrade_level, null]]

    useEffect(()=>{
        setLoader(true);
        setError('');
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:5000/student/${id}`,{
            headers: {Authorization: `Bearer ${token}`}
        }).then(res =>{
            setLoader(false);
            setName(res.data.name);
            setStudent_id(res.data.student_id);
            setUniversity_name(res.data.university_name);
            setPhone_number(res.data.phone_number);
            setEmail(res.data.email);
            setCountry(res.data.country);
            setAddress(res.data.address);
            setCity(res.data.city);
            setGrade_level(res.data.grade_level);
        }).catch(err=>{
            if(err.response.data){
                setError(err.response.data);
            }else{
                setError(err.response.statusText);
            }
            setLoader(false);
        })
    },[id]);

    const onStudentUpdate = ()=>{
        check = checkStudentInput({name, student_id, university_name, phone_number, email, address, city, country});
        if(check.isValid){
            setLoader(true);
            setError('');
            const token = localStorage.getItem('token');
            axios.patch(`http://localhost:5000/student/${id}`,{
                name, student_id, grade_level, university_name, phone_number, email, address, city, country
            },{
                headers: {Authorization: `Bearer ${token}`}
            }).then(res =>{
                setLoader(false);
                alert(res.data.message);
                history.push('/students');
            }).catch(err=>{
                if(err.response.data){
                    setError(err.response.data);
                }else{
                    setError(err.response.statusText);
                }
                setLoader(false);
                console.log(err.response)

            })
        }else{
            setError(check);
        }
    }
    let studentUpdateForm = <Form allState={allState}
                                    action = {onStudentUpdate}
                                    actionName = "Update Student"
                                    error = {error} />
   
    if(loader){
        studentUpdateForm = <Loader/>
    }
    return(
        <>
            {studentUpdateForm}
        </>
    )
}

export default UpdateStudent;
