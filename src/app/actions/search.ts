import { POST_TO_SERVER, GET_TO_SERVER } from '../constants/api';
import { MOVE_QUESTION_FROM_SEARCH, GET_QUESTION_FROM_SEARCH } from './questionAction';
export const QUESTION = 'QUESTION';

export const SEARCH_QUESTION_LIST = ' SEARCH_QUESTION_LIST';


export const searchQuestion = (questionLike, moveToQuestion?: boolean) => ({
  url: `/api/questions/searchQuestion?question=${questionLike}`,
  type: POST_TO_SERVER,
  verb: moveToQuestion ? MOVE_QUESTION_FROM_SEARCH : SEARCH_QUESTION_LIST,
  method: 'GET'
});

export const moveSearchQuestion = () => (dispatch,getState) => {
    const {search:{questions}} = getState()
    dispatch({
      type: MOVE_QUESTION_FROM_SEARCH,
      payload: {questions}
    })
}



