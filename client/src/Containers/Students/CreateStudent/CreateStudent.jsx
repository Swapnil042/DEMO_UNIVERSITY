import React, { useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import {checkStudentInput} from '../../../utility';
import Loader from '../../../Components/Loader/Loader';
import Form from '../../../Components/Form/Form'

const CreateStudent= ()=>{
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
    let check = null;
    //isValid, idError, phoneError, nameError, universityError, addressError, cityError, countryError, emailError
    const allState = [["Name", name, setName, error.nameError], ["ID", student_id, setStudent_id, error.idError], ['University Name', university_name, setUniversity_name, error.universityError],
                        ["Phone", phone_number, setPhone_number, error.phoneError], ["Email", email, setEmail, error.emailError],
                        ["Address", address, setAddress, error.addressError], ["City", city, setCity, error.cityError],
                        ["Country", country, setCountry, error.countryError], ["Grade Level", grade_level, setGrade_level, error.gradeError]]

    const onStudentCreate = ()=>{
        check = checkStudentInput({name, student_id, university_name, phone_number, email, address, city, country, grade_level});
        if(check.isValid){
            setLoader(true);
            setError('');
            const token = localStorage.getItem('token');
            axios.post('http://localhost:5000/student',{
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

            })
        }else{
            setError(check);
        }
    }
    let studentCreateForm = <Form allState={allState}
                                    action = {onStudentCreate}
                                    actionName = "Add Student"
                                    error = {error} />
   
    if(loader){
        studentCreateForm = <Loader/>
    }
    return(
        <>
            {studentCreateForm}
        </>
    )
}

export default CreateStudent;
