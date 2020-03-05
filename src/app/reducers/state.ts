import { UserModel } from './user';
import { questionData } from './question';
import { RefrenceData } from './refrenceData';
import { securityQuestionsInterface } from './securityQuestion';
import { userAuth } from './auth';
import { refrenceQuestion } from './search';
import { activeQuestionInterface} from './activeQuestion'
import { CommentData } from './EditorBox';
import {activeCommentInterface} from './activeComment';
import { BrowserHistoryBuildOptions } from 'history';


export interface history {
  createBrowserHistory(options?: BrowserHistoryBuildOptions): History
}

export interface RootState {
  user: RootStateNameSpace.userReducer;
  questions: RootStateNameSpace.questionReducer;
  refrenceData: RootStateNameSpace.refrenceData;
  securityQuestions: Array<RootStateNameSpace.securityQuestionReducer>;
  auth: RootStateNameSpace.authReducer;
  search: RootStateNameSpace.searchReducer;
  router?: any;
  activeQuestion: RootStateNameSpace.activeQuestion;
  comments:  RootStateNameSpace.saveCommentReducer;
  activeComment: RootStateNameSpace.activeComment; 
}

export namespace RootStateNameSpace {
  export type userReducer = UserModel;
  export type questionReducer = questionData;
  export type refrenceData = RefrenceData;
  export type searchReducer = refrenceQuestion;
  export type activeQuestion = activeQuestionInterface;
  export type activeComment = activeCommentInterface;
  export type saveCommentReducer = CommentData
  export type securityQuestionReducer = securityQuestionsInterface;
  export type authReducer = userAuth;
}
