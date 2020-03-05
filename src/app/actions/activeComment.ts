export const SAVE_ACTIVE_COMMENT = 'SAVE_ACTIVE_COMMENT';
export const COMMENT = 'COMMENT';

export const activeComment = (activeCommentId) => ({
    type: SAVE_ACTIVE_COMMENT,
    payload: {
      activeCommentId
      
    }
  });