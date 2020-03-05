import { handleActions } from 'redux-actions';
import {
  SAVE_QUESTION,
  MOVE_QUESTION_FROM_SEARCH,
  GET_QUESTION_FROM_SEARCH,
  question
} from '../actions/questionAction';

import { history } from '../../main';
import { EDITOR_SAVE_COMMENT, getAllComments, comment } from 'app/actions/EditorBox';

export interface questionFields {
  userName: string;
  question: string;
  comment: string;
  like: Array<string>;
  dislike: Array<string>;
  views: string;
  answersCount: string;
  commentId: Array<string>;
  uuidQuestion: string;
  tagId: Array<string>;
  rateQuestion: string;
  skillName: Array<string>;
  questionCategory: Array<string>;
  creationTime: string;
  activeTime: string;
}

export interface questionData {
  [questionId: string]: questionFields;
}

const INITIAL_STATE: questionData = {
  '43891930-14133-4199-111068-66148982121512141': {
    comment: '<p>;CRICKET</p>↵',
    question:
      'Mumbai Indians play their last two round-robin matches at home and are one win away from sealing a spot in the playoffs ',
    tagId: ['Javascript', 'React', 'Node', 'Python'],
    userName: 'Raushan',
    commentId: ['415107141142-415113-4412-11072-121311831110527141'],
    uuidQuestion: '43891930-14133-4199-111068-66148982121512139',
    like: ['10'],
    dislike: [],
    views: '14',
    rateQuestion: '4',
    answersCount: '54',
    skillName: [],
    questionCategory: [],
    creationTime: '',
    activeTime: ''
  },
  '43891930-14133-4199-111068-66148982121512138': {
    comment: '<p>;IPL</p>↵',
    question: 'IPL 2019: Hyderabad on stand by for IPL final venue on May 12',
    tagId: ['Html', 'Css', 'Express', 'Redux'],
    userName: 'Ravi',
    commentId: ['415107141142-415113-4412-11072-121311831110527145'],
    uuidQuestion: '43891930-14133-4199-111068-66148982121512138',
    like: ['18'],
    dislike: [],
    views: '10',
    rateQuestion: '2',
    answersCount: '54',
    skillName: [],
    questionCategory: [],
    creationTime: '',
    activeTime: ''
  },
  '43891930-14133-4199-111068-66148982121512139': {
    comment: '<p>;DC</p>↵',
    question: 'Russell press conference achieves nothing for KKR: Pollock',
    tagId: ['Cassandra', 'C++', 'Cql'],
    userName: 'Ravish',
    commentId: ['415107141142-415113-4412-11072-121311831110527148'],
    uuidQuestion: '43891930-14133-4199-111068-66148982121512188',
    like: ['16'],
    dislike: [],
    views: '12',
    rateQuestion: '3',
    answersCount: '54',
    skillName: [],
    questionCategory: [],
    creationTime: '',
    activeTime: ''
  },
  '43891930-14133-4199-111068-66148982121512140': {
    comment: '<p>;SRH</p>↵',
    question: 'Delhi Capitals Climb To Top Of IPL Table, End Of RCB Playoff Hopes',
    tagId: ['Python', 'Java', 'Saga'],
    userName: 'Rahul',
    commentId: ['415107141142-415113-4412-11072-121311831110527140'],
    uuidQuestion: '43891930-14133-4199-111068-66148982121512130',
    like: ['21'],
    dislike: [],
    views: '17',
    rateQuestion: '5',
    answersCount: '54',
    skillName: [],
    questionCategory: [],
    creationTime: '',
    activeTime: ''
  }
};

const movedSearchQuestion = (state, action) => {
  setTimeout(() => history.push('/blogpage'), 0);
  const { questions } = action.payload;
  const newQuestion = {};
  questions.forEach((question) => {
    newQuestion[question.questionId] = question;
  });
  return {
    ...newQuestion
  };
};

const updateCommentIdQuestion = (state, action) => {
  const { commentId } = action.payload;
  const newCommentId = [];
  commentId.forEach((commentId) => {
    newCommentId[commentId.activeQuestionId.commentId] = commentId;
  });

  return {
    ...newCommentId
  };
};

export default handleActions<questionData, any>(
  {
    [`${SAVE_QUESTION}_SUCCESS`]: (state, action) => {
      setTimeout(() => history.push('/blogpage'), 0);
      const newQuestion = { [action.payload.data.uuidQuestion]: action.payload.data };
      return {
        ...state,
        ...newQuestion
      };
    },
    [`${MOVE_QUESTION_FROM_SEARCH}_SUCCESS`]: (state, action) => {
      action.payload.questions = action.payload.data;
      return movedSearchQuestion(state, action);
    },
    [`${EDITOR_SAVE_COMMENT}_SUCCESS`]: (state, action) => {
      return {
        ...state,
        [action.payload.data.comments.uuidQuestion]: {
          ...state[action.payload.data.comments.uuidQuestion],
          commentId: [
            ...state[action.payload.data.comments.uuidQuestion].commentId,
            action.payload.data.comments.commentId
          ]
        }
      };
    },
    [MOVE_QUESTION_FROM_SEARCH]: movedSearchQuestion
  },
  INITIAL_STATE
);
