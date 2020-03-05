import {
  EDITOR_BOX,
  EDITOR_SAVE_COMMENT,
  EDITOR_SAVE_SUBCOMMENTS,
  commentOfComment
} from '../actions/EditorBox';
import { handleActions } from 'redux-actions';
import { EditorState } from 'draft-js';
import { history } from '../../main';

import { GET_COMMENT } from 'app/actions/EditorBox';

export interface EditorModel {
  commentAsHTML: string;
  uuidComment: Array<string>;
  activeQuestionId: string;
  like: Array<string>;
  dislike: Array<string>;
  views: string;
  subcommentId: Array<string>;
  userName: string;
  tagId: Array<string>;
  comments: string;
  activeTime: string;
  creationTime: string;
  commentId: Array<string>;
  questionId: Array<string>;
  activeCommentId: string;
}

export interface CommentData {
  [commentId: string]: EditorModel;
  
}

const INITIAL_STATE: CommentData = {
  
};

const savedComment = (action) => {
  const { comments } = action.payload.data;
  const newComment = {};
  newComment[comments.commentId] = comments;
  return {
    ...newComment
  };
};

export default handleActions<CommentData, any>(
  {
    [EDITOR_BOX]: (state, action) => {
      return Object.assign({}, state, {
        editorValue: action.payload.data,
        value: action.payload.data.saveSubcomment
      });
    },

    [`${GET_COMMENT}_SUCCESS`]: (state, action) => {

      return{ ...state, [action.payload.data.commentId]:action.payload.data };
    },

    [`${EDITOR_SAVE_COMMENT}_SUCCESS`]: (state, action) => {
      return { ...state, ...savedComment(action) };
    },
    [`${EDITOR_SAVE_SUBCOMMENTS}_SUCCESS`]: (state, action) => {
      return {
        ...state,
        [action.payload.data.saveSubcomment.commentId]: action.payload.data.saveSubcomment,
        [action.payload.data.saveSubcomment.questionId]: {
          ...state[action.payload.data.saveSubcomment.questionId],
          subcommentId: action.payload.data.subcommentIds
        } 
      };
    },
    
  },
  INITIAL_STATE
);






