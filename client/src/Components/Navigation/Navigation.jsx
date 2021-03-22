import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Navigation.module.css'

const Navigation = (props)=>{
    return(
        <div className={classes.nav}>
            <Link className={classes.link} to={"/"}>Home</Link>
            <Link className={classes.link} to={"/users"}>All Users</Link>
            <Link className={classes.link} to={"/students"}>Students</Link>
            <Link className={classes.link} to={"/courses"}>Courses</Link>
        </div>
    )
}
 
export default Navigation;