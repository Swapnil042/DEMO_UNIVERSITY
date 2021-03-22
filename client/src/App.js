import { useState } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import classes from './App.module.css';
import SignIn from './Containers/Auth/SignIn/SignIn';
import SignUp from './Containers/Auth/SignUp/SignUp';
import Navigation from './Components/Navigation/Navigation';
import Home from './Containers/Home/Home';
import Users from './Containers/Users/Users';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          <Route exact path={'/students'} />
          <Route exact path={'/courses'} />
          <Route exact path={'/student/create'} />
          <Route exact path={'/student/update/:id'}/>
          <Route exact path={'/course/update/:id'}/>
          <Redirect to={'/'}/>
        </Switch>
      </>
    )
  }

  return (
    <div className={classes.app}>
      {routes}
    </div>
  );
}

export default App;
