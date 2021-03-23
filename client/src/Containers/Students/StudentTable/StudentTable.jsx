import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classes from './StudentTable.module.css';
import {useHistory} from 'react-router-dom';
 
const StudentTable=(props)=> {
  const history = useHistory();

  const onEditStudent = (id)=>{
    history.push(`/student/update/${id}`);
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Student Id</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Phone</b></TableCell>
            <TableCell><b>University</b></TableCell>
            <TableCell><b>Grade</b></TableCell>
            <TableCell><b>Address</b></TableCell>
            <TableCell><b>City</b></TableCell>
            <TableCell><b>Created By</b></TableCell>
            <TableCell><b>Updated By</b></TableCell>
            <TableCell><b>Action</b></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.allstudents.map((student, idx) => (
            <TableRow key={idx}>
                <TableCell component="th" scope="row">{student.name}</TableCell>
                <TableCell align="left">{student.student_id}</TableCell>
                <TableCell align="left">{student.email}</TableCell>
                <TableCell align="left">{student.phone_number}</TableCell>
                <TableCell align="left">{student.university_name}</TableCell>
                <TableCell align="left">{student.grade_level}</TableCell>
                <TableCell align="left">{student.address}</TableCell>
                <TableCell align="left">{student.city}</TableCell>
                <TableCell align="left">{student.created_by_first_name} {student.created_by_last_name}</TableCell>
                <TableCell align="left">
                    {student.updated_by_first_name ? `${student.updated_by_first_name} ${student.updated_by_last_name}`: '-------'}
                </TableCell>
                <TableCell align="left">
                    <button className={classes.button} onClick={()=> onEditStudent(student.student_id)}>Edit</button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentTable;