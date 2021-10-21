/*
 *
 * Dashboard reducer
 *
 */
import produce, { original } from 'immer';
import * as actions from './constants';

export const initialState = {
  token: localStorage.getItem('token'),
  transactions:{
    data:[],
    error:false,
    loading:false
  }
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actions.GET_TRANSACTION_REQUEST:
      case actions.UPDATE_TRANSACTION_REQUEST:
      case actions.CREATE_TRANSACTION_REQUEST:
      case actions.DELETE_TRANSACTION_REQUEST:
        draft.transactions.loading = true;
        draft.transactions.error = false;
        break;
      case actions.GET_TRANSACTION_SUCCESS:
        draft.transactions.loading = false;
        draft.transactions.error  = null;
        draft.transactions.data = action.payload;
        break;
      case actions.GET_TRANSACTION_ERROR:
      case actions.UPDATE_TRANSACTION_ERROR:        
      case actions.DELETE_TRANSACTION_ERROR:        
      case actions.CREATE_TRANSACTION_ERROR:        
        draft.transactions.loading = false;
        draft.transactions.error = action.payload;
        break;
      case actions.UPDATE_TRANSACTION_SUCCESS:
        draft.transactions.loading = false;
        const index = draft.transactions.data.findIndex(t => t._id === action.identifier)
        draft.transactions.data[index] = action.payload;
        break;  
      case actions.CREATE_TRANSACTION_SUCCESS:
        draft.transactions.loading = false;
        draft.transactions.data.push(action.payload);
        break; 
      case actions.DELETE_TRANSACTION_SUCCESS:
        draft.transactions.loading = false;
        draft.transactions.data = draft.transactions.data.filter(t => t._id !== action.identifier);
        break; 
    }
  });

export default dashboardReducer;
