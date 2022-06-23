/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState } from 'react';
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
import { useTranslation } from 'react-i18next';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { AppLog, setModuleName } from '../utils/services/appLog';

import { useForm } from '../utils/helpers/hooks';
import { createUserWithEmail } from '../utils/firebase/firebaseAuth';
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
  const { t } = useTranslation();
  const classes = useStyles();
  const user = getContext('user');
  const [errors, setErrors] = useState({ email: '', password: '' });

  AppLog(user, 'user called from register page is ');

  if (user) {
    AppLog(user, 'user is ');
    props.history.push('/content');
  }

  const { onChange, onSubmit, values } = useForm(callbackRegisterUser, {
    email: '',
    password: '',
  });

  function callbackRegisterUser() {
    // AppLog(values.email, 'email is ');
    // AppLog(values.password, 'password is ');

    createUserWithEmail(values.email, values.password)
      .then()
      .catch((error) => {
        AppLog(error, 'error register is ');
        if (error.code === 'auth/email-already-in-use') {
          setErrors({ ...errors, email: 'email already in use, pleas login' });
        }
        if (error.code === 'auth/invalid-email') {
          setErrors({ ...errors, email: 'invalid email' });
        }
        if (error.code === 'auth/missing-email') {
          setErrors({ ...errors, email: 'email must not be empty' });
        }
        if (error.code === 'auth/internal-error') {
          setErrors({ ...errors, password: 'password must not be empty' });
        }
      });
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
            {t('form:guide.signup')}
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
              {t('form:buttons.signup')}
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t('form:guide.forgotPassword')}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {t('form:guide.haveAccountSignin')}
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
