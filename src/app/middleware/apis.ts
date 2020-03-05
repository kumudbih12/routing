import { POST_TO_SERVER } from '../constants/api';
import { Middleware } from 'redux';
import axios  from 'axios';



export const apis: Middleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(action);
  }

  if (action.type === POST_TO_SERVER) {
    const { method, url, payload, customHeader } = action;
    axios({
      method,
      url,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer df498c83-1c88-308e-a224-5408dd67bb7f",
        ...customHeader
      },
      validateStatus: function (status) {
        return status >= 200 && status < 300; // default
      },
      maxRedirects: 0,
      timeout: 2000,
    })
      .then(function(payload) {
        store.dispatch({
          type: `${action.verb}_SUCCESS`,
          payload,
          actionPayload: {
            ...action.payload
          }
        });
      })
      .catch((err) => {
        console.log(err);
        store.dispatch({
          type: `${action.verb}_ERROR`,
          payload
        });
      });
  }
  return next(action);
};
