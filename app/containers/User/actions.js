/*
 *
 * User actions
 *
 */

import * as actions from './constants';
import { SECURE_API_CALL, PUBLIC_API_CALL } from '../App/constants';


export function authorize(email, password) {
  return {
    type: PUBLIC_API_CALL,
    payload: { email, password },
    endpoint: `auth/signin`,
    method: 'POST',
    onStart: actions.AUTH_REQUEST,
    onError: actions.AUTH_FAILURE,
    onSuccess: actions.AUTH_SUCCESS,
  };
}

export function signup(name, email, password) {
  return {
    type: PUBLIC_API_CALL,
    payload: { name, email, password },
    endpoint: `auth/signup`,
    method: 'POST',
    onStart: actions.AUTH_REQUEST,
    onError: actions.AUTH_FAILURE,
    onSuccess: actions.AUTH_SUCCESS,
  };
}

// export function authorize(email, password) {
//   return {
//     type: actions.AUTH_REQUEST,
//     payload: { email, password },
//   };
// }

// export function signup(name, email, password) {
//   return {
//     type: actions.SIGNUP_REQUEST,
//     payload: { name, email, password },
//   };
// }

export function logout() {
  return {
    type: actions.LOGOUT_REQUEST,
  };
}

export function getProfile() {
  return {
    type: SECURE_API_CALL,
    endpoint: `users/me`,
    method: 'GET',
    onStart: actions.PROFILE_REQUEST,
    onError: actions.PROFILE_FAILURE,
    onSuccess: actions.PROFILE_SUCCESS,
  };
}
