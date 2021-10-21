import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */

const makeSelectTransactions = () =>
createSelector(
  selectDashboardDomain,
  subState => ({
    loading: subState.transactions.loading,
    error: subState.transactions.error,
    data: subState.transactions.data,
  }),
);

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(
    selectDashboardDomain,
    subState => subState,
  );

export default makeSelectDashboard;
export {
  makeSelectTransactions
};
