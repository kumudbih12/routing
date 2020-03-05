import { handleActions } from 'redux-actions';

import { GET_TAG_LIST,ADD_NEW_TAG,  } from '../actions/questionAction';
import { GET_COUNTRY_LIST, GET_STATE_LIST, GET_CITY_LIST } from '../actions/user';
import { STATUS_CODES } from 'http';

export interface RefrenceData {
  countries: Array<countryInterface>;
  states: Array<stateInterface>;
  cities: Array<cityInterface>;
  tags: Array<tagInterface>;
}
export interface countryInterface {
  countryCode: string;
  countryName: string;
}
export interface stateInterface {
  stateCode: string;
  stateName: string;
}
export interface cityInterface {
  cityCode: string;
  cityName: string;
}
export interface tagInterface {
  tagName: string;
}

const INITIAL_STATE: RefrenceData = {
  countries: [],
  states: [],
  cities: [],
  tags: [],
};

export default handleActions<RefrenceData, any>(
  {
    [`${GET_COUNTRY_LIST}_SUCCESS`]: (state, action) => {
      return Object.assign({}, state, {
        countries: action.payload.data.data,
        states: [],
        cities: []
      });
    },
    [`${GET_STATE_LIST}_SUCCESS`]: (state, action) => {
      return Object.assign({}, state, { states: action.payload.data.data });
    },
    [`${GET_CITY_LIST}_SUCCESS`]: (state, action) => {
      return Object.assign({}, state, { cities: action.payload.data.data });
    },
    [`${GET_TAG_LIST}_SUCCESS`]: (state, action) => {
      return Object.assign({}, state, { tags: action.payload.data.data });
    },
    [`${ADD_NEW_TAG}_SUCCESS`]: (state, action) => {
      return Object.assign({}, state, { tags: [...state.tags, action.payload] });
    }
    
  },
  INITIAL_STATE
);
