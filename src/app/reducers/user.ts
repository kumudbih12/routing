import { TEXT_CHANGED } from '../actions/user';
import { handleActions } from 'redux-actions';
import { SIGN_UP_DETAIL } from '../actions/user';

export interface UserModel {
  userName?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: string;
  gender?: string;
  dateOfBirth?: string;
  city?: any;
  state?: any;
  country?: any;
  zip?: string;
  phoneNo?: string;
  questions?: Array<userSecurityQuestion>;
}

export interface userSecurityQuestion {
  question?: string;
  userAnswer?: string; 
}

/** initial state */
const INITIAL_STATE: UserModel = {
  userName: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  gender: '',
  dateOfBirth: '',
  city: '',
  state: '',
  country: '',
  zip: '',
  phoneNo: '',
  questions: []
};

export default handleActions<UserModel, any>(
  {
    [TEXT_CHANGED]: (state, action) => {
      if (action.payload.fieldName === 'country') {
        return Object.assign({}, state, { country: action.payload.value, state: '', city: '' });
      } else if (action.payload.fieldName === 'state') {
        return Object.assign({}, state, { state: action.payload.value, city: '' });
      } else {
        return Object.assign({}, state, { [action.payload.fieldName]: action.payload.value });
      }
    },
  },
  INITIAL_STATE
);
