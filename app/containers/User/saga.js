import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import * as actions from './constants';
import { API_URL } from '../App/constants';

const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

function* authorize({ payload: { email, password } }) {
  try {
    const data = yield call(
      request,
      `${API_URL}auth/signin`,
      { email, password },
      options,
    );
    yield put({ type: actions.AUTH_SUCCESS, payload: data.token });
    yield put({ type: actions.PROFILE_REQUEST });
  } catch (error) {
    yield put({ type: actions.AUTH_FAILURE, payload: "Incorrect Credentials" });
  }
}

function* signup({ payload: { name, email, password } }) {
  try {
    const data = yield call(
      request,
      `${API_URL}auth/signup`,
      {name, email, password },
      options,
    );
    yield put({ type: actions.SIGNUP_SUCCESS, payload: data.token });
  } catch (error) {
    yield put({ type: actions.SIGNUP_FAILURE, payload: error.message });
  }
}

export default function* Saga() {
  // yield takeLatest(actions.AUTH_REQUEST, authorize);
  // yield takeLatest(actions.SIGNUP_REQUEST, signup);
}
