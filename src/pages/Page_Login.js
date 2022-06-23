/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Divider from '@material-ui/core/Divider';
import { useTranslation } from 'react-i18next';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { AppLog, setModuleName } from '../utils/services/appLog';
// import { AuthContext } from '../Components/AuthProvider';
import Image from '../Images/canada_flag.jpg';
import { getContext } from '../utils/helpers/appContext';

import { useForm } from '../utils/helpers/hooks';
import {
  firebase,
  loginUserWithEmail,
  uiConfig,
} from '../utils/firebase/firebaseAuth';
import { MessagesContext } from '../utils/context/contextMessages';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // flexWrap: 'wrap',
    // backgroundImage: `url(${Image})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundAttachment: 'fixed',
    // backgroundSize: 'cover',
    // backgroundPositionY: 'center',
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
  divider: {
    marginTop: theme.spacing(3),
  },
}));

export default function Page_Login(props) {
  setModuleName('Page_Login');

  const { messages, addMessage, updateMessage } = useContext(MessagesContext);
  AppLog(messages, 'messages from context is ');

  const { t } = useTranslation();
  const classes = useStyles();

  const user = getContext('user');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firebase: '',
  });

  useEffect(() => {
    updateMessage({ login: errors });
  }, [errors]);

  AppLog(user, 'user called from login page is ');

  if (user) {
    AppLog(user, 'user is ');
    props.history.push('/content');
  }

  const { onChange, onSubmit, values } = useForm(callbackLoginUser, {
    email: '',
    password: '',
  });

  // login user by email callback
  function callbackLoginUser() {
    loginUserWithEmail(values.email, values.password)
      .then()
      .catch((error) => {
        AppLog(error, 'error login is ');
        if (error.code === 'auth/user-not-found') {
          setErrors({ ...errors, email: 'user not found' });
        }
        if (error.code === 'auth/invalid-email') {
          setErrors({ ...errors, email: 'invalid email' });
        }
        if (error.code === 'auth/wrong-password') {
          setErrors({ ...errors, password: 'wrong password' });
        }
        if (error.code === 'auth/too-many-requests') {
          setErrors({
            ...errors,
            firebase: 'too many requests, reset password or try later',
          });
        }

        // values.email = '';
        // values.password = '';
      });
  }

  // copyright
  let Copyright = (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('form:guide.signin')}
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              error={errors.email !== ''}
              helperText={errors.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('form:textField.email.label')}
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={onChange}
            />
            <TextField
              error={errors.password !== ''}
              helperText={errors.password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('form:textField.password.label')}
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={onChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t('form:guide.rememberMe')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              {t('form:buttons.signin')}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t('form:guide.forgotPassword')}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {t('form:guide.noAccountSignup')}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Divider className={classes.divider} variant="middle" />

        <StyledFirebaseAuth
          uiCallback={(ui) => ui.disableAutoSignIn()}
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
        <Box mt={8}>{Copyright}</Box>
      </Container>
    </div>
  );
}
