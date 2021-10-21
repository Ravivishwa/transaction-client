import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeSelectIsLoggedIn, makeSelectHasProfile } from '../selectors';
import { getProfile } from '../actions';

/* eslint-disable react/prefer-stateless-function */
export class ProtectedRoute extends React.Component {
  render() {
    const { isLoggedIn, hasProfile, refreshUserInfo, ...rest } = this.props;

    if (isLoggedIn) {
      if (hasProfile) {
        return <Route {...rest} />;
      }
      refreshUserInfo();
    } else {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return <CircularProgress />;
  }
}

ProtectedRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  hasProfile: PropTypes.bool,
  refreshUserInfo: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
  hasProfile: makeSelectHasProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    refreshUserInfo: () => dispatch(getProfile()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProtectedRoute);
