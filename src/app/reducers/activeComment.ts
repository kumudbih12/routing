import { handleActions } from 'redux-actions';
import { history } from '../../main';
import { SAVE_ACTIVE_COMMENT } from '../actions/activeComment';
import {EDITOR_SAVE_SUBCOMMENTS} from '../actions/EditorBox';

export interface activeCommentInterface {
  activeCommentId: string;
}

const INITIAL_STATE: activeCommentInterface = {
  activeCommentId: ''
};



export default handleActions<activeCommentInterface, any>(
  {
    [SAVE_ACTIVE_COMMENT]: (state, action) => {
      const {
        payload: { activeCommentId }
      } = action;
      return {
        ...state,
        activeCommentId
      };
    },

    [`${SAVE_ACTIVE_COMMENT}_SUCCESS`]: (state, action) => {
      return {
        ...state,
        activeCommentId: '',
      };
    },
    [`${EDITOR_SAVE_SUBCOMMENTS}_SUCCESS`]: (state, action) => {
      return {
        ...state,
        activeCommentId: '',
      };
    },
  },
  INITIAL_STATE
);

