import { combineReducers } from 'redux';
import { RootState, RootStateNameSpace } from './state';
import user from './user';
import questions from './question';
import refrenceData from './refrenceData';
import securityQuestions from './securityQuestion';
import auth from './auth';
import search from './search';
import activeQuestion from './activeQuestion';
import comments from './EditorBox';
import activeComment from './activeComment';
import { history } from '../../main';
import { connectRouter } from 'connected-react-router';


// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
console.log('4444444',history)
export const rootReducer = combineReducers({
  user,
  questions,
  refrenceData,
  search,
  activeQuestion,
  comments,
  securityQuestions,
  auth,
  activeComment,
  router: connectRouter(history),
});
