/*
 *
 * Dashboard actions
 *
 */

import * as actions from './constants';
import { SECURE_API_CALL } from '../App/constants';

export function getTransactions() {
  return {
    type: SECURE_API_CALL,
    endpoint: `transaction/all`,
    method: 'GET',
    onStart: actions.GET_TRANSACTION_REQUEST,
    onError: actions.GET_TRANSACTION_ERROR,
    onSuccess: actions.GET_TRANSACTION_SUCCESS,
  };
}

export function createTransaction(payload) {
  return {
    type: SECURE_API_CALL,
    endpoint: `transaction/add`,
    method: 'POST',
    payload,
    onStart: actions.CREATE_TRANSACTION_REQUEST,
    onError: actions.CREATE_TRANSACTION_ERROR,
    onSuccess: actions.CREATE_TRANSACTION_SUCCESS,
  };
}

export function updateTransaction(identifier,payload) {
  return {
    type: SECURE_API_CALL,
    endpoint: `transaction/${identifier}`,
    method: 'PUT',
    identifier,
    payload,
    onStart: actions.UPDATE_TRANSACTION_REQUEST,
    onError: actions.UPDATE_TRANSACTION_ERROR,
    onSuccess: actions.UPDATE_TRANSACTION_SUCCESS,
  };
}

export function deleteTransaction(identifier) {
  return {
    type: SECURE_API_CALL,
    endpoint: `transaction/${identifier}`,
    method: 'DELETE',
    identifier,
    onStart: actions.DELETE_TRANSACTION_REQUEST,
    onError: actions.DELETE_TRANSACTION_ERROR,
    onSuccess: actions.DELETE_TRANSACTION_SUCCESS,
  };
}
