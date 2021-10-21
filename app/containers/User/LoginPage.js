/*
 * Login Page
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import styled from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectProcessing,
  makeSelectError,
  makeSelectIsLoggedIn,
} from './selectors';
import Form from './components/LoginForm';
import { authorize, signup } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'user';

export function LoginPage({
  submitLogin,
  error,
  loading,
  isLoggedIn,
  signup,
  match,
  history
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const signupUrl = match.url.includes("signup")
  const [tab, setTab] = useState(0);

  const handleChange = (newValue) => {
    setTab(newValue);
  };
  if (isLoggedIn) {
    return <Redirect to="/dashboard" push />;
  }

  return (
    <article>
      <Helmet>
        <title>Login Page</title>
        <meta name="description" content="Login into Vactrac" />
      </Helmet>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper square>
              <Tabs
                value={tab}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab label="Admin" {...a11yProps(0)} />
              </Tabs>
            </Paper>
            <div>
              <TabPanel value={tab} index={0}>
                <Form
                  onSubmit={signupUrl ? signup : submitLogin}
                  signup={signupUrl}
                  error={error}
                  processing={loading}
                  history={history}
                />
              </TabPanel>
            </div>
          </Grid>
        </Grid>
      </Container>
    </article>
  );
}

LoginPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  submitLogin: PropTypes.func,
  signup: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectProcessing(),
  error: makeSelectError(),
  isLoggedIn: makeSelectIsLoggedIn(),
});

export function mapDispatchToProps(dispatch) {
  return {
    submitLogin: (email, password) => {
      dispatch(authorize(email, password));
    },
    signup: (name, email, password) => {
      dispatch(signup(name, email, password));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
