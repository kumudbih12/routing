import { POST_TO_SERVER } from '../constants/api';
import RegistrationPage from '../components/Registration/RegistrationPage';
import { url } from 'inspector';

/** constant */
export const TEXT_CHANGED = 'TEXT_CHANGED';
export const GET_COUNTRY_LIST = 'GET_COUNTRY_LIST';
export const REGISTRATION_PAGE = 'REGISTRATION_PAGE';
export const SIGN_IN = 'SIGN_IN';
export const USERDATA_EXIST = 'USERDATA_EXIST';
export const SIGN_UP_DETAIL = 'SIGN_UP_DETAIL';
export const GET_STATE_LIST = 'GET_STATE_LIST';
export const SELECT_STATE_LIST = 'SELECT_STATE_LIST';
export const GET_CITY_LIST = 'GET_CITY_LIST';
export const SAVE_USER_DETAILS = 'SAVE_USER_DETAILS';
export const RESET_SIGN_IN_ERROR = 'RESET_SIGN_IN_ERROR';
export const RESET_ERROR = 'RESET_ERROR';
export const ALL_USERS_LIST = 'ALL_USERS_LIST';

export interface userAction {
  type: string;
  payload: userValue;
}

export interface userValue {
  fieldName: string;
  value: string;
}

/********action  */
export const textChanged = (fieldName, text): userAction => {
  return {
    type: TEXT_CHANGED,
    payload: {
      fieldName: fieldName,
      value: text
    }
  };
};

export const registrationPage = (registrationPage) => {
  return (dispatch, getState) => {
    dispatch({
      type: REGISTRATION_PAGE,
      payload: RegistrationPage
    });
  };
};

export const getAllCountryList = () => ({
  url: '/api/batch/getcountryFile',
  type: POST_TO_SERVER,
  verb: GET_COUNTRY_LIST,
  method: 'GET'
});

export const getAllStatelist = (selectedCountry) => ({
  url: `/api/stateByCountry?country_code=${selectedCountry}`,
  type: POST_TO_SERVER,
  verb: GET_STATE_LIST,
  method: 'GET'
});

export const getAllCitylist = (selectedCountry, selectedState) => ({
  url: `/api/cityBystate?country_code=${selectedCountry}&state_code=${selectedState}`,
  type: POST_TO_SERVER,
  verb: GET_CITY_LIST,
  method: 'GET'
});

export const signIn = (userName, password) => {
  return (dispatch) => {
    dispatch({
      url: `api/auth/signIn`,
      type: POST_TO_SERVER,
      verb: SIGN_IN,
      customHeader: {
        Authorization:
          'Digest username="", realm="", nonce="", uri="/api/auth/signIn", response="234543535", opaque=""'
      },
      method: 'POST',
      payload: {
        userName,
        password
      }
    });
  };
};

export const logout = (token) => {

}

export const resetSignInError = () => ({
  type: RESET_SIGN_IN_ERROR
});

export const isMatchByCredentials = (userName, email) => ({
  url: `api/auth/searchByCredentials`,
  type: POST_TO_SERVER,
  verb: USERDATA_EXIST,
  method: 'POST',
  payload: {
    userName,
    email
  }
});
