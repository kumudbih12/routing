import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

import { POST_TO_SERVER } from '../constants/api';
import { activeTime,  } from './serverTimeStamp';
export const MOVE_COMMENT_FROM_SEARCH = 'MOVE_COMMENT_FROM_SEARCH';
export const EDITOR_BOX = 'EDITOR_BOX';
export const EDITOR_SAVE_COMMENT = 'EDITOR_SAVE_COMMENT';
export const EDITOR_SAVE_SUBCOMMENTS = 'EDITOR_SAVE_SUBCOMMENTS';
export const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES';
export const GET_QUESTION_LIST = 'GET_QUESTION_LIST';
export const GET_QUESTION = 'GET_QUESTION';
export const COMMENT_FROM_QUESTION = 'COMMENT_FROM_QUESTION';
export const SUBCOMMENT_FROM_COMMENT = 'SUBCOMMENT_FROM_COMMENT';
export const GET_COMMENT = 'GET_COMMENT';
export interface EditorBoxAction {
  type: string;
  payload: string;
}

export const editorBox = (editorBox) => {
  return (dispatch) => {
    dispatch({
      type: EDITOR_BOX,
      payload: editorBox
    });
  };
};
export const comment = (editorValue,uuidQuestion,uuidComment) => {
  return ( dispatch) => {
    dispatch({
      url: '/api/comments/savecomment/post',
      type: POST_TO_SERVER,
      verb: EDITOR_SAVE_COMMENT,
      method: 'POST',
      payload: {
        uuidQuestion,
        uuidComment,
        subcommentId:'',
        commentAsHTML: draftToHtml(convertToRaw(editorValue.getCurrentContent())),
        userName: 'kumud',
        views: ['12'],
        tagId: ['abc', 'xyz'] ,
        like: ['5'],
        dislike: ['1'],
        
      }
    });
  };
};

export const commentOfComment = (value,uuidComment) => {
  return ( dispatch) => {
    dispatch({
      url: '/api/comments/savedsubcomment/post',
      type: POST_TO_SERVER,
      verb: EDITOR_SAVE_SUBCOMMENTS,
      method: 'POST',
      payload: {
        uuidComment,
        subcommentId: '',
        commentAsHTML: draftToHtml(convertToRaw(value.getCurrentContent())),
        userName: 'kumud',
        views: ['12'],
        tagId: ['abc', 'xyz'] ,
        like: ['5'],
        dislike: ['1'],
        
      }
    });
  };
};

export const savedComment = () => (dispatch, getState) => {
  const {
    save: { comments }
  } = getState();

  dispatch({
    type: COMMENT_FROM_QUESTION,
    payload: { comments }
  });
};




export const getComment = (activecommentId) => {
  return (dispatch) => {
    dispatch({
      url: `/api/comments/getComment?comment_id=${activecommentId}`,
      type: POST_TO_SERVER,
      verb:  GET_COMMENT,
      method: 'GET'
    })
  }
}



export const getAllComments = (editorBox) => {
  return (dispatch) => {
    dispatch({
      url: '/api/comments/getcomment/:id',
      type: POST_TO_SERVER,
      verb: GET_ALL_MESSAGES,
      method: 'GET'
    });
  };
};
