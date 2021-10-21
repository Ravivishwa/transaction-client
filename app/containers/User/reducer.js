/*
 *
 * User reducer
 *
 */
import produce from 'immer';
import * as actions from './constants';

export const parseJwt = token => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const initialState = {
  auth_loading: false,
  auth_error: null,
  token: localStorage.getItem('token'),
  otp_loading: false,
  otp_error: null,
  login_loading: false,
  login_error: null,
  username: null,
  roles: [],
  profile_loading: false,
  profile_error: null,
  profile: null,
};

let jwtInfo;

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actions.SIGNUP_REQUEST:
      case actions.AUTH_REQUEST:
        draft.auth_loading = true;
        draft.auth_error = false;
        draft.token = null;
        draft.info = null;
        draft.roles = [];
        break;
      case actions.SIGNUP_FAILURE:
      case actions.AUTH_FAILURE:
        draft.auth_loading = false;
        draft.auth_error = action.payload;
        draft.token = null;
        draft.info = null;
        break;
      case actions.AUTH_SUCCESS:
      case actions.SIGNUP_SUCCESS:
        jwtInfo = parseJwt(action.payload.token);
        localStorage.setItem('token', action.payload.token);
        draft.auth_loading = false;
        draft.auth_error = null;
        draft.token = action.payload.token;
        Object.assign(draft, jwtInfo);
        break;
      case actions.LOGOUT_REQUEST:
        localStorage.clear();
        localStorage.setItem('token', null);
        draft.token = null;
        break;
      case actions.PROFILE_REQUEST:
        draft.profile_loading = true;
        draft.profile_error = null;
        break;
      case actions.PROFILE_SUCCESS:
        draft.profile_loading = false;
        draft.profile_error = null;
        draft.profile = action.payload;
        break;
      case actions.PROFILE_FAILURE:
        jwtInfo = parseJwt(localStorage.getItem('token'));
        Object.assign(draft, jwtInfo);
        draft.profile_loading = false;
        draft.profile_error = action.payload;
        draft.profile = null;
        break;
    }
  });

export default userReducer;
