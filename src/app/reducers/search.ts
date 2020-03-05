import { handleActions } from 'redux-actions';
import { SEARCH_QUESTION_LIST } from 'app/actions/search';

import { history } from '../../main';

export interface refrenceQuestion {
  questions: Array<questionInterface>;
}
export interface questionInterface {
  question: string;
}

const INITIAL_STATE: refrenceQuestion = {
  questions: []
};

export default handleActions<refrenceQuestion, any>(
  {
    [`${SEARCH_QUESTION_LIST}_SUCCESS`]: (state, action) => {
      return Object.assign({}, state, { questions: action.payload.data });
    },
  
  },
  INITIAL_STATE
);
