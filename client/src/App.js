import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar'
import  Register from './components/auth/Register';
import  Login from './components/auth/Login';
import Home from './components/Dashboard/Home';
import PrivateRoute from './components/Routes/PrivateRoute';
import Questions from './components/layout/Questions';
import Answer from './components/layout/Answer';

// REDUX
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Modal from 'react-modal';
import Alert from './components/layout/Alert';


if(localStorage.token) {
  console.log('app component')
  setAuthToken(localStorage.token);
}


// TO REMOVE MODAL-WARNING

Modal.setAppElement('#root')

function App() { 

  console.log('app component 2')

  useEffect(() => {
    console.log('app useEffect')
    setAuthToken(localStorage.token);
    store.dispatch(loadUser()); 
  }, [])

  return (
    <Provider store = {store}>
      <Router>
         <Navbar/>
         <Alert />
         
         <Switch>
          <Route exact path = '/register' component = {Register} /> 
          <Route exact path = '/login' component = {Login} />
          {/* <PrivateRoute exact path = '/profile/:id' component = {Profile} /> */}
          <PrivateRoute exact path = '/home' component = {Home} />
          <PrivateRoute exact path = '/questions' component = {Questions} />
          <PrivateRoute exact path = '/questions/:id' component = {Answer} />
         </Switch>
      </Router>
    </Provider>
  );
}

export default App;
