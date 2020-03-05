export const UPDATE_SECURITY_QUESTION = 'UPDATE_SECURITY_QUESTION';
export const REMOVE_ANSWERED_QUESTION = 'REMOVE_ANSWERED_QUESTION';
export const REMOVE_ONCE_SELECTED_QUESTION = 'REMOVE_ONCE_SELECTED_QUESTION';
export const SAVE_SECURITY_QUESTION = 'SAVE_SECURITY_QUESTION';
export const GET_SECURITY_QUESTION_LIST = 'GET_SECURITY_QUESTION_LIST';
import { POST_TO_SERVER } from '../constants/api';
import { UserModel } from 'app/reducers/user';

export const updateSecurityQuestion = (question, userAnswer) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SECURITY_QUESTION,
      payload: {
        question,
        userAnswer
      }
    });
  };
};

export const removeAnsweredQuestion = (question) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ANSWERED_QUESTION,
      payload: {
        question
      }
    });
  };
};

export const getAllSecurityQuestions = () => ({
  url: `/api/securityQuestion/getAllSecurityQuestions`,
  type: POST_TO_SERVER,
  verb: GET_SECURITY_QUESTION_LIST,
  method: 'GET'
});

export const saveUserDetails = ({
  questions,
  password,
  firstName,
  lastName,
  addressLine1,
  addressLine2,
  gender,
  dateOfBirth,
  city,
  state,
  country,
  zip,
  phoneNo,
  userName
}: UserModel) => {
  return (dispatch, getState) => {
    const { userName: userNameOfState, email } = getState().user;
    dispatch({
      url: `/api/securityQuestion/saveNewSecurityQuestions`,
      type: POST_TO_SERVER,
      verb: SAVE_SECURITY_QUESTION,
      method: 'POST',
      payload: {
        questions,
        email,
        password,
        firstName,
        lastName,
        addressLine1,
        addressLine2,
        gender,
        dateOfBirth,
        city,
        state,
        country,
        zip,
        phoneNo,
        userName: userName || userNameOfState || 'Raushan'
      }
    });
  };
};
