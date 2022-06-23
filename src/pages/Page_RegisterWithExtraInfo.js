/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuthState } from 'react-firebase-hooks/auth';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { AppLog, setModuleName } from '../utils/services/appLog';
import Image from '../Images/canada_flag.jpg';
import { useForm } from '../utils/hooks';
import {
  createUserWithEmail,
  loginUserWithEmail,
  auth,
  signInWithGoogle,
} from '../utils/firebase/firebaseAuth';
import { getContext } from '../utils/helpers/appContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    //  flexWrap: 'wrap',
    // backgroundImage: `url(${Image})`,
    //   backgroundRepeat:'no-repeat',
    // backgroundAttachment: 'fixed',
    // backgroundSize: 'cover',
    // backgroundPositionY: 'center'
  },
  paper: {
    marginTop: theme.spacing(8),
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

export default function Page_Register(props) {
  setModuleName('Page_Register');
  const classes = useStyles();
  const user = getContext('user');

  AppLog(user, 'user called from register page is ');

  if (user) {
    AppLog(user, 'user is ');
    props.history.push('/content');
  }

  const { onChange, onSubmit, values } = useForm(callbackRegisterUser, {
    email: '',
    password: '',
    username: '',
    phone: '',
    gender: '',
    DOB: '',
  });

  const signupFirstStep = (
    <>
      {' '}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={values.username}
        onChange={onChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={values.email}
        onChange={onChange}
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
        autoComplete="current-password"
        value={values.password}
        onChange={onChange}
      />
    </>
  );

  const signupSecondStep = (
    <>
      {' '}
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="gender"
        label="Gender"
        name="gender"
        autoComplete="gender"
        autoFocus
        value={values.gender}
        onChange={onChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phone"
        label="Phone"
        name="phone"
        autoComplete="phone"
        value={values.phone}
        onChange={onChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="DOB"
        label="DOB"
        id="DOB"
        autoComplete="DOB"
        value={values.DOB}
        onChange={onChange}
      />
    </>
  );

  // const [signupStep, setSignupStep] = useState(signupFirstStep);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const hint = isFirstStep ? 'NEXT' : 'BACK';
  const signupStep = isFirstStep ? signupFirstStep : signupSecondStep;

  function callbackRegisterUser() {
    AppLog(values.email, 'email is ');
    AppLog(values.password, 'password is ');
    AppLog(values.username, 'username is ');
    createUserWithEmail(values.email, values.password);
  }

  function handleClickHint() {
    if (isFirstStep) {
      // setSignupStep(signupSecondStep);
      setIsFirstStep(false);
    } else {
      // setSignupStep(signupFirstStep);
      setIsFirstStep(true);
    }
  }

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CreateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            {signupStep}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link href="#" variant="body2" onClick={handleClickHint}>
              {hint}
            </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
              disabled={isFirstStep}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {'Already have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
