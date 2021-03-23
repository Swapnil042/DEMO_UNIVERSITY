import { useEffect, useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';

import classes from './App.module.css';
import SignIn from './Containers/Auth/SignIn/SignIn';
import SignUp from './Containers/Auth/SignUp/SignUp';
import LogOut from './Containers/Auth/Logout/Logout';
import Navigation from './Components/Navigation/Navigation';
import Loader from './Components/Loader/Loader';

import Home from './Containers/Home/Home';

import Users from './Containers/Users/Users';

import Courses from './Containers/Courses/Courses';
import CreateCourse from './Containers/Courses/CreateCourse/CreateCourse';
import UpdateCourse from './Containers/Courses/UpdateCourse/UpdateCourse';

import Students from './Containers/Students/Students';
import CreateStudent from './Containers/Students/CreateStudent/CreateStudent';
import UpdateStudent from './Containers/Students/UpdateStudent/UpdateStudent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(()=>{
    if(!isAuthenticated){
      setLoader(true);
      const token = localStorage.getItem('token');
      if(token){
        axios.post('http://localhost:5000/autologin',{},{
          headers: {Authorization: `Bearer ${token}`}
        }).then(res=>{
          setLoader(false);
          setIsAuthenticated(true);
        }).catch(err=>{
          setLoader(true);
          setIsAuthenticated(false);
        })
      }else{
        setLoader(false);
        setIsAuthenticated(false);
      }
    }
  },[isAuthenticated]);

  let routes = (
    <Switch>
      <Route exact path={'/'} component={()=> <SignIn auth={setIsAuthenticated}/>}/>
      <Route exact path={'/signup'} component={()=> <SignUp/>}/>
      <Redirect to={'/'}/>
    </Switch>
  )
  if(isAuthenticated){
    routes = (
      <>
        <Navigation/>
        <Switch>
          <Route exact path={'/'}  component={Home} />
          
          <Route exact path={'/users'} component={Users}/>
          <Route exact path={'/students'} component={Students}/>
          <Route exact path={'/courses'} component={Courses}/>

          <Route exact path={'/student/create'} component={CreateStudent} />
          <Route exact path={'/course/create'} component={CreateCourse} />

          <Route exact path={'/student/update/:id'} component={UpdateStudent}/>
          <Route exact path={'/course/update/:id'} component={UpdateCourse}/>

          <Route exact path={'/logout'} component={()=><LogOut auth={setIsAuthenticated}/>}/>
          <Redirect to={'/'}/>
        </Switch>
      </>
    )
  }
  if(loader){
    routes = <Loader/>;
  }

  return (
    <div className={classes.app}>
      {routes}
    </div>
  );
}

export default App;
