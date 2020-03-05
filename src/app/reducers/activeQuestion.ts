import { handleActions } from 'redux-actions';
import { history } from '../../main';
import { SAVE_ACTIVE_QUESTION } from '../actions/activeQuestion';
import { MOVE_QUESTION_FROM_ACTIVE_QUESTION } from 'app/actions/questionAction';

export interface activeQuestionInterface {
  activeQuestionId: string;
}

const INITIAL_STATE: activeQuestionInterface = {
  activeQuestionId: ''
};



export default handleActions<activeQuestionInterface, any>(
  {
    [SAVE_ACTIVE_QUESTION]: (state, action) => {
      const {
        payload: { activeQuestionId }
      } = action;
      return {
        ...state,
        activeQuestionId
      };
    },
  },
  INITIAL_STATE
);
