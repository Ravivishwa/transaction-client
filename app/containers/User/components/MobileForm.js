import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

MobileForm.propTypes = {
  requestOtp: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
  processing: PropTypes.bool,
  message: PropTypes.string,
  mobile: PropTypes.string,
};

export default function MobileForm({
  requestOtp,
  login,
  error,
  processing,
  message,
  mobile,
}) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState('180');
  const intervalRef = useRef(null);
  const [resendHide, setResendHide] = useState(true);
  let hasMobile = !!mobile;

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor(((total / 1000) % 60) + minutes * 60);
    return { total, seconds };
  }

  function startTimer(deadline) {
    const { total, seconds } = getTimeRemaining(deadline);
    if (total >= 0) {
      setTimer(`Resend OTP after - ${seconds} sec`);
    } else {
      setTimer('Resend OTP');
      clearInterval(intervalRef.current);
      setResendHide(false);
    }
  }

  function clearTimer(endtime) {
    setTimer('180');
    if (intervalRef.current) clearInterval(intervalRef.current);
    const id = setInterval(() => {
      startTimer(endtime);
    }, 1000);
    intervalRef.current = id;
  }

  function getDeadlineTime() {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 180);
    return deadline;
  }

  function onRequestOtp() {
    setResendHide(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    clearTimer(getDeadlineTime());
  }
  function resetMobile() {
    hasMobile = false;
    setUsername('');
  }
  return (
    <div className={classes.paper}>
      <Typography component="h4" variant="h5">
        Enter your mobile number
      </Typography>
      <form className={classes.form} noValidate>
        {message && <Chip label={message} color="primary" />}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="mobile"
          label="Mobile Number"
          name="mobile"
          type="tel"
          autoFocus={!hasMobile}
          disabled={hasMobile}
          value={mobile || username}
          onChange={e => setUsername(e.target.value)}
        />
        {hasMobile && (
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="otp"
            label="OTP"
            name="otp"
            type="tel"
            autoFocus
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {processing ? (
          <LinearProgress />
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => {
              e.preventDefault();
              onRequestOtp();
              return hasMobile ? login(mobile, otp) : requestOtp(username);
            }}
          >
            {hasMobile ? 'Verify and Login' : 'Request OTP'}
          </Button>
        )}
        {hasMobile && (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={resendHide}
                className={classes.submit}
                onClick={e => {
                  e.preventDefault();
                  setResendHide(true);
                  return hasMobile ? login(mobile, otp) : requestOtp(username);
                }}
              >
                {timer}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={resendHide}
                className={classes.submit}
                onClick={e => {
                  e.preventDefault();
                  setResendHide(true);
                  return resetMobile();
                }}
              >
                Change Mobile Number
              </Button>
            </Grid>
          </Grid>
        )}
      </form>
    </div>
  );
}
