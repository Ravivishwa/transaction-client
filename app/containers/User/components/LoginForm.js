import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
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

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  processing: PropTypes.bool,
  message: PropTypes.string,
};

export default function LoginForm({ onSubmit, error, processing, message, signup, history }) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(signup){
      onSubmit(name, username, password);
    }
    else{
      onSubmit(username, password);
    }     
  }
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {signup ? "Sign up" : "Sign in"}        
      </Typography>
      <form className={classes.form} noValidate>
        {message && <Chip label={message} color="primary" />}
        {signup ? (
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
        />
        ) : null}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {processing ? (
          <LinearProgress />
        ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e) => handleSubmit(e)}
                >
                {signup ? "Sign up" : "Sign in"} 
                </Button>
                <Typography component="h1" variant="h5" align="center">
                   OR       
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => history.push(`${signup ? "/" : "/signup"}`)}
                >
                  {signup ? "Sign in" : "Sign up"} 
                </Button>
              </>
            )}
      </form>
    </div>
  );
}
