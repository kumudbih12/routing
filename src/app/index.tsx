import * as React from 'react';
import { Component } from 'react';

import { App as TotApp } from 'app/containers/App';
import { hot } from 'react-hot-loader';
import BlogPage from './components/BlogPage/BlogPage';
import AskQuestion from './components/AskQuestion/AskQuestion';
import QuestionPage from './components/QuestionPage/QuestionPage';
import NoMatch from './components/NoMatch/NoMatch';
import SignIn from './components/loging/SignIn';
import SignUp from './components/Registration/SignUp';
import RegistrationPage from './components/Registration/RegistrationPage';
import forgotPassword from './components/forgotPassword/forgotPassword';
import securityQuestion from './components/securityQuestion/securityQuestion';
import userPreview from './components/userPreview/userPreview';
import footer from './components/footer/footer';
import passwordResetForm from './components/passwordResetForm/passwordResetForm';
import questionnaire from './components/Questionnaire/questionnaire';
import { Route,Switch } from 'react-router-dom';


export const App = hot(module)(() => (
  
    <Switch>
      <Route exact path="/" component={TotApp} />
      <Route path="/blogpage" component={BlogPage} />
      <Route path="/askQuestion" component={AskQuestion} />
      <Route path="/questionAsk" component={QuestionPage} />
      <Route path="/login" component={SignIn} />
      <Route path="/Signup" component={SignUp} />
      <Route path="/Registration" component={RegistrationPage} />
      <Route path="/forgotPassword" component={forgotPassword} />
      <Route path="/securityQuestion" component={securityQuestion} />
      <Route path="/userPreview" component={userPreview} />
      <Route path="/footer" component={footer} />
      <Route path="/resetPassword" component={passwordResetForm} />
      <Route exact path="/questionnaire" component={questionnaire} />
      <Route path="/questionnaire/:id" component={questionnaire} />
      <Route component={NoMatch} />
    </Switch>
  
));
