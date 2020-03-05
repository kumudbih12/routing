
export const QUESTION = 'QUESTION';
export const SAVE_ACTIVE_QUESTION = 'SAVE_ACTIVE_QUESTION';

export const activeQuestion = (activeQuestionId) => ({
  type: SAVE_ACTIVE_QUESTION,
  payload: {
    activeQuestionId
    
  }
});
