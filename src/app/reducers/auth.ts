import { handleActions } from 'redux-actions';
import { SIGN_IN, RESET_SIGN_IN_ERROR, USERDATA_EXIST, ALL_USERS_LIST } from '../actions/user';
import { history } from '../../main';

export interface userAuth {
  user_name: string;
  token: string;
  password: string;
  error: errorInterface;
  errorMessage: string;
}

export interface errorInterface {
  userName: boolean;
  email: boolean;
  signInError: boolean;
}

export interface payloadInterface {
  token: string;
  error: boolean;
}

export interface actionPayloadInterface {
  type: string;
  payload: any;
  actionPayload: any;
}

const INITIAL_STATE: userAuth = {
  user_name: '',
  token: '',
  password: '',
  error: { userName: false, email: false, signInError: false },
  errorMessage: ''
};

export default handleActions<userAuth, any>(
  {
    [`${SIGN_IN}_SUCCESS`]: (state, action: actionPayloadInterface) => {
      if (action.payload.data.error) {
        return {
          ...state,
          error: { ...state.error, signInError: true }
        };
      }
      setTimeout(() => history.push('./blogpage'), 0);
      return {
        ...state,
        token: action.payload.data.token,
        error: { ...state.error, userName: false, email: false }
      };
    },

    [`${SIGN_IN}_ERROR`]: (state, action: actionPayloadInterface) => {
      return {
        ...state,
        error: { ...state.error, userName: false, email: false }
      };
    },

    [RESET_SIGN_IN_ERROR]: (state, action) => {
      return {
        ...state,
        error: { ...state.error, userName: false, email: false }
      };
    },

    [`${USERDATA_EXIST}_SUCCESS`]: (state, action: actionPayloadInterface) => {
      if (action.payload.data.error) {
        return {
          ...state,
          error: {
            ...state.error,
            ...action.actionPayload.userName ? {userName : true} : {email: true},
          }
        };
      }
      return {
        ...state,
        error: { ...state.error, userName: false, email: false }
      };
    }
  },
  INITIAL_STATE
);
