import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from './CourseTable.module.css';
import {useHistory} from 'react-router-dom';

const CourseTable=(props)=> {
  const history = useHistory();

  const onEditCourse = (id)=>{
    history.push(`/course/update/${id}`);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Course Title</b></TableCell>
            <TableCell><b>Course Id</b></TableCell>
            <TableCell><b>Course Description</b></TableCell>
            <TableCell><b>Course Price</b></TableCell>
            <TableCell><b>Course Rating</b></TableCell>
            <TableCell><b>Created By</b></TableCell>
            <TableCell><b>Updated By</b></TableCell>
            <TableCell><b>Action</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.allcourses.map((course, idx) => (
            <TableRow key={idx}>
                <TableCell component="th" scope="row">{course.course_title}</TableCell>
                <TableCell align="left">{course.course_id}</TableCell>
                <TableCell align="left">{course.course_description}</TableCell>
                <TableCell align="left">{course.course_price}</TableCell>
                <TableCell align="left">{course.course_rating}</TableCell>
                <TableCell align="left">{course.created_by_first_name} {course.created_by_last_name}</TableCell>
                <TableCell align="left">
                    {course.updated_by_first_name ? `${course.updated_by_first_name} ${course.updated_by_last_name}`: '-------'}
                </TableCell>
                <TableCell align="left">
                    <button className={classes.button} onClick={()=>onEditCourse(course.course_id)}>Edit</button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CourseTable;