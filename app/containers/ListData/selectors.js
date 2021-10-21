import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the listData state domain
 */

const selectListDataDomain = state => state.listData || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ListData
 */

const makeSelectListData = () =>
  createSelector(
    selectListDataDomain,
    substate => substate,
  );

export default makeSelectListData;
export { selectListDataDomain };
