export const QUESTION = 'QUESTION';
export const SAVE_ACTIVE_TIME = 'SAVE_ACTIVE_TIME';

export const activeTime = (creationTime,activeTime) => ({
  type: SAVE_ACTIVE_TIME,
  payload: {
    creationTime,
    activeTime
    
  }
});