import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Navigation.module.css'

const Navigation = (props)=>{
    return(
        <div className={classes.nav}>
            <div className={classes.innerNav}>
                <Link className={classes.link} to={"/"}>Home</Link>
                <Link className={classes.link} to={"/users"}>Users</Link>
                <Link className={classes.link} to={"/students"}>Students</Link>
                <Link className={classes.link} to={"/courses"}>Courses</Link>
            </div>
            <div  style={{float: 'right'}}>
                <Link className={classes.link} to={"/logout"}>Log Out</Link>
            </div>
        </div>
        
    )
}
 
export default Navigation;