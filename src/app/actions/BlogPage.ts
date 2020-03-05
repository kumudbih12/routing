import BlogPage from '../components/BlogPage/BlogPage';

export const GET_ALL_QUESTION = 'GET_ALL_QUESTION';
export const BLOGPAGE = 'BLOGPAGE';
export const QUESTIONS= "QUESTIONS";
export const SKILL = "SKILL";
export const TOPIC= "TOPIC";
export const VOTE= "VOTE";
export const VIEW= "VIEW";


export interface BlogPageAction {
  type: string;
  payload: string;
}

export interface BlogPageValue {
  clickVote: string;
  value: string;
}

export const blogPage = (blogPage) => {
  return (dispatch, getState) => {
    dispatch({
      type: BLOGPAGE,
      payload: BlogPage
    })
  }
}


export const skill = (skill) => {
  return {
    type: SKILL,
    payload: Text
  };
}

export const topic = (topic) => {
  return {
    type: TOPIC,
    payload: Text
  };
}

export const vote = (vote) => {
  return {
    type: VOTE,
    payload: {vote}
  }
}

export const view = (view) => {
  return {
    type: VIEW,
    payload: {view}
  }
}
