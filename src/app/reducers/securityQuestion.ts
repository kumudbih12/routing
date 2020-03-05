import { handleActions } from 'redux-actions';
import {
  UPDATE_SECURITY_QUESTION,
  REMOVE_ANSWERED_QUESTION,
  SAVE_SECURITY_QUESTION,
  GET_SECURITY_QUESTION_LIST
} from '../actions/securityQuestion';
import { history } from '../../main';

export interface securityQuestionsInterface {
  question: string;
  userAnswer: string;
  customQuestion?: boolean;
}

export interface SECURITY_QUESTION_DATA {
  SECURITY_QUESTION_DATA;
}

const INITIAL_STATE = [];

export default handleActions<Array<securityQuestionsInterface>, any>(
  {
    [UPDATE_SECURITY_QUESTION]: (state, action) => {
      const {
        payload: { question, userAnswer }
      } = action;
      const questionIndex = state.findIndex((stateQuestion) => stateQuestion.question === question);
      const copyOfState = [...state];
      if (questionIndex === -1) {
        copyOfState.push({ ...action.payload, customQuestion: true });
      } else {
        copyOfState[questionIndex] = action.payload;
      }
      return copyOfState;
    },

    [REMOVE_ANSWERED_QUESTION]: (state, action) => {
      const {
        payload: { question }
      } = action;
      const questionIndex = state.findIndex((stateQuestion) => stateQuestion.question === question);
      const copyOfState = [...state];
      if (questionIndex !== -1) {
        if (copyOfState[questionIndex].customQuestion) {
          copyOfState.splice(questionIndex, 1);
        } else {
          copyOfState[questionIndex].userAnswer = '';
        }
      }
      return copyOfState;
    },

    [`${SAVE_SECURITY_QUESTION}_SUCCESS`]: (state, action) => {
      return [
        ...state,
      ];
    },

    [`${GET_SECURITY_QUESTION_LIST}_SUCCESS`]: (state, action) => {
      return action.payload.data.data
    },
  },
  INITIAL_STATE
);
