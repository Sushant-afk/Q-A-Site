import { combineReducers } from 'redux';
import auth  from './auth';
import profile from './profile';
import questions from './questions';
import alert from './alert';
import { DELETE_SESSION } from '../actions/types';

let state = {
  auth,
  profile,
  questions,
  alert
};

const appReducer =  combineReducers(state);

const rootReducer = (state, action) => {
  if (action.type === DELETE_SESSION) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;