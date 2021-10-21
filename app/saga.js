/* eslint-disable prettier/prettier */
import { takeEvery, call, put, race, select, take } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';
import request from './utils/request';

import { SECURE_API_CALL, API_URL, PUBLIC_API_CALL } from './containers/App/constants';
import * as userActions from './containers/User/constants';
import { makeSelectToken } from './containers/User/selectors';
import userSaga from './containers/User/saga';

export function* secureApiSaga() {
  yield takeEvery(SECURE_API_CALL, checkSessionAndCall);
}

export function* publicApiSaga() {
  yield takeEvery(PUBLIC_API_CALL, apiCall);
}

// Check Authentication and Make Secure Call
export function* checkSessionAndCall(action) {
  let token = yield select(makeSelectToken());
  if (token === null) {
    yield put(push('/login'));
    const { loggedIn } = yield race({
      loggedIn: take(userActions.AUTH_SUCCESS),
      cancelled: take(userActions.AUTH_FAILURE),
    });
    if (loggedIn) {
      // Because we are listening LOGIN_SUCCESS in a middleware, we need
      // to delay our reaction to the event to make sure it hit the store.
      yield delay(100);
      token = yield select(makeSelectToken());
    }
  }
  if (token) {
    yield call(apiCall, action, { Authorization: `Bearer ${token}` });
  }
}

function* apiCall(action, authHeader = {}) {
  const {
    endpoint,
    payload,
    method,
    onStart,
    onSuccess,
    onError,
    identifier,
    headers,
  } = action;
  const options = {
    method: method || 'GET',
    headers: { Accept: 'application/json', ...authHeader, ...headers },
  };

  if (onStart) {
    yield put({ type: onStart, payload, identifier });
  }

  try {
    const { response, timeout } = yield race({
      response: request(`${API_URL}${endpoint}`, payload, options),
      // timeout: call(delay, 60000),
    });

    if ((method === 'DELETE' || method === 'POST') && response === null) {
      yield put({
        type: onSuccess,
        request: payload,
        identifier,
      });
    } else if (response) {
      yield put({
        type: onSuccess,
        payload: response,
        request: payload,
        identifier,
      });
    } else if (timeout) {
      yield put({
        type: onError,
        payload: { message: 'Request Timed Out!' },
      });
    } else {
      yield put({
        type: onError,
        identifier,
        payload: { message: 'Unknown Error!' },
      });
    }
  } catch (err) {
    const error = yield parseError(err);
    console.log('parsedError', err, error);
    // Handle Token Expiry
    if (error.status && error.status === 401) {
      yield put({
        type: userActions.LOGOUT_REQUEST,
        payload: 'Session expired - please login again!',
      });
    } else {
      console.log({type: onError, payload: error, identifier});
      yield put({ type: onError, payload: error, identifier });
    }
  }
}

/**
 * Parses the error response into a legible one
 * @param {object} error
 * @returns {*}
 */

function* parseError(error) {
  console.log('parseError', error);
  let parsed;
  try {
    parsed = yield error.response.json();
  } catch (err) {
    parsed = error.response
      ? {
        status: error.response.status,
        message: error.message || error.response.statusText,
      }
      : {
        name: error.name,
        message: error.message,
        status: error.status,
        token: error.token,
      };
  }

  return parsed;
}

const sagas = [secureApiSaga, publicApiSaga, userSaga];
export default sagas;
