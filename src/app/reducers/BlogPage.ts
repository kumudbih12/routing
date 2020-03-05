import { QUESTIONS, VOTE, VIEW, SKILL, TOPIC } from '../actions/BlogPage';
import { handleActions } from 'redux-actions';

export interface BlogPageModel {
  questions: [
    {
      question: string;
      skills: Array<string>;
    }
  ];
  view: {
    numberOfViews: number;
  };
  answers: [
    {
      answer: string;
      answerByUser: {
        userName: string;
        rating: string;
      };
    }
  ];
  vote: {
    positive: number;
    negative: number;
  };
}

/** initial state */
const INITIAL_STATE: BlogPageModel = {
  questions: [
    {
      question: ' ',
      skills: []
    }
  ],
  view: {
    numberOfViews: 0
  },
  answers: [
    {
      answer: ' ',
      answerByUser: {
        userName: ' ',
        rating: ' '
      }
    }
  ],
  vote: {
    positive: 0,
    negative: 0
  }
};

export default handleActions<BlogPageModel, any>(
  {
    [QUESTIONS]: (state, action) => {
      return Object.assign({}, state, { [action.payload]: action.payload });
    },
    [SKILL]: (state, action) => {
      return Object.assign({}, state, { [action.payload]: action.payload });
    },
    [TOPIC]: (state, action) => {
      return Object.assign({}, state, { [action.payload]: action.payload });
    },
    [VOTE]: (state, action) => {
      return Object.assign({}, state, {
        vote: { positive: ++state.vote.positive, negative: state.vote.negative }
      });
    },
    [VIEW]: (state, action) => {
      return Object.assign({}, state, {
        view: { numberOfViews: ++state.view.numberOfViews }
      });
    },
  },
  INITIAL_STATE
);
