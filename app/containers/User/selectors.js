import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the user state domain
 */

const selectUserDomain = state => state.user || initialState;

/**
 * Other specific selectors
 */
const makeSelectIsLoggedIn = () =>
  createSelector(
    selectUserDomain,
    subState => subState.token !== null && subState.token !== 'null',
  );

const makeSelectHasProfile = () =>
  createSelector(
    selectUserDomain,
    subState => subState.profile !== null,
  );

const makeSelectIsAdmin = () =>
  createSelector(
    selectUserDomain,
    subState => subState.roles && subState.roles.includes('ROLE_ADMIN'),
  );

const makeSelectIsFirm = () =>
  createSelector(
    selectUserDomain,
    subState => subState.roles && subState.roles.includes('ROLE_FIRM'),
  );

const makeSelectIsTeam = () =>
  createSelector(
    selectUserDomain,
    subState => subState.roles && subState.roles.includes('ROLE_TEAM'),
  );

const makeSelectInfo = () =>
  createSelector(
    selectUserDomain,
    subState => ({ username: subState.username, roles: subState.roles }),
  );

const makeSelectToken = () =>
  createSelector(
    selectUserDomain,
    subState => (subState.token ? subState.token : null),
  );

const makeSelectProcessing = () =>
  createSelector(
    selectUserDomain,
    subState => subState.auth_loading,
  );

const makeSelectError = () =>
  createSelector(
    selectUserDomain,
    subState => subState.auth_error,
  );

const makeSelectLogin = () =>
  createSelector(
    selectUserDomain,
    subState => ({
      loading: subState.otp_loading || subState.login_loading,
      error: subState.otp_error || subState.login_error,
      token: subState.token ? subState.token : null,
    }),
  );

/**
 * Default selector used by User
 */

const makeSelectUser = () =>
  createSelector(
    selectUserDomain,
    subState => subState,
  );

export default makeSelectUser;
export {
  selectUserDomain,
  makeSelectIsLoggedIn,
  makeSelectProcessing,
  makeSelectError,
  makeSelectToken,
  makeSelectInfo,
  makeSelectLogin,
  makeSelectIsAdmin,
  makeSelectIsTeam,
  makeSelectHasProfile,
  makeSelectIsFirm,
  makeSelectUser,
};
