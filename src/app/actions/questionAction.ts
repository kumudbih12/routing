export const SAVE_QUESTION = 'SAVE_QUESTION';
export const ADD_NEW_TAG = 'ADD_NEW_TAG';
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';
export const MOVE_QUESTION_FROM_SEARCH = 'MOVE_QUESTION_FROM_SEARCH';
export const MOVE_QUESTION_FROM_ACTIVE_QUESTION = 'MOVE_QUESTION_FROM_ACTIVE_QUESTION';
export const MOVE_RELATED_QUESTION_FROM_SEARCH = 'MOVE_RELATED_QUESTION_FROM_SEARCH';
export const GET_ALL_SAVED_QUESTION = 'GET_ALL_SAVED_QUESTION';
export const GET_QUESTION_FROM_SEARCH = 'GET_QUESTION_FROM_SEARCH';
export const UPDATE_COMMENT_ID_FROM_QUESTIONS = 'COMMENT_FROM_QUESTIONS';

export const GET_TAG_LIST = 'GET_TAG_LIST';
export const QUESTION_PAGE = 'QUESTION_PAGE';
export const QUESTION = 'QUESTION';
import { POST_TO_SERVER } from '../constants/api';

export const question = (question) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION,
      payload: question
    });
  };
};

export const saveQuestion = (tagId, commentAsHTML, question) => {
  return (dispatch, getState) => {
    const { userName } = getState().user;
    dispatch({
      url: `/api/questions/postquestion`,
      type: POST_TO_SERVER,
      verb: SAVE_QUESTION,
      method: 'POST',
      payload: {
        tagId: tagId,
        commentAsHTML,
        question,
        userName: userName || 'Samir'
      }
    });
  };
};

export const updateCommentIdQuestion = () => (dispatch, getState) => {
  const {
    save: { commentId }
  } = getState();

  dispatch({
    type: UPDATE_COMMENT_ID_FROM_QUESTIONS,
    payload: { commentId }
  });
};

export const getQuestionDetails = () => {
  return (dispatch) => {
    dispatch({
      url: `/api/questions/getAllQuestions`,
      type: POST_TO_SERVER,
      verb: GET_ALL_SAVED_QUESTION,
      method: 'GET'
    });
  };
};

export interface tagAction {
  type: string;
  payload: tagValue;
}

export interface tagValue {
  fieldName: string;
  value: string;
}

export const getAllTagList = () => ({
  url: `/api/tags/allTags`,
  type: POST_TO_SERVER,
  verb: GET_TAG_LIST,
  method: 'GET'
});

export const saveNewTag = (tagName) => ({
  url: `/api/tags/addTags`,
  type: POST_TO_SERVER,
  verb: ADD_NEW_TAG,
  method: 'POST',
  payload: {
    tagName
  }
});
