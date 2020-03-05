import { handleActions } from 'redux-actions';

import { SAVE_ACTIVE_TIME } from '../actions/serverTimeStamp';


export interface activeTimeInterface {
  creationTime: string;
  activeTime: string;
}

const INITIAL_STATE: activeTimeInterface = {
  creationTime: '',
  activeTime: '',
};



export default handleActions<activeTimeInterface, any>(
    {
      [SAVE_ACTIVE_TIME]: (state, action) => {
        const {
          payload: { creationTime, activeTime }
        } = action;
        return {
          ...state,
          creationTime,
          activeTime
        };
      },
    },
    INITIAL_STATE
  );