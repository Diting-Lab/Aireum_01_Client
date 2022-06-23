/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardHeader from '@material-ui/core/CardHeader';
import { useTranslation } from 'react-i18next';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { AppLog, setModuleName } from '../utils/services/appLog';
import { useForm } from '../utils/helpers/hooks';
import {
  updateUserProfile,
  updateUserEmail,
} from '../utils/firebase/firebaseAuth';
import { getContext } from '../utils/helpers/appContext';
import ReAuthModal from './ReAuthModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
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

export default function ProfileFromProvider(props) {
  setModuleName('ProfileFromProvider');

  const { t } = useTranslation();

  const [disabled, setDisabled] = useState(true);
  const classes = useStyles();
  // const user = getContext('user');
  const user = getContext('authProviderData').user;
  const { providerId, profile } =
    getContext('authProviderData').additionalUserInfo;
  const { displayName, email, phoneNumber, uid } = user;

  const birthDate = providerId === 'facebook.com' ? profile.birthday : '';
  AppLog(birthDate, 'birth date is ');

  const [isReAuth, setIsReAuth] = useState(false);

  let reAuthComponent = isReAuth ? <ReAuthModal isReAuth={isReAuth} /> : '';

  const { onChange, onSubmit, values } = useForm(callbackUpdateProfile, {
    username: displayName,
    email: email,
    phone: phoneNumber,
    provider: providerId,
    uid: uid,
    birthDate: birthDate,
  });

  const [errors, setErrors] = useState({ email: '', username: '' });
  // let submitDisabled = values.username === '';
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (values.username === '') {
      setSubmitDisabled(true);
      setErrors({ ...errors, username: 'name can not be empty' });
    } else {
      setSubmitDisabled(false);
      setErrors({ ...errors, username: '' });
    }
  }, [values.username]);

  //update profile
  function callbackUpdateProfile() {
    displayName !== values.username && updateUserProfile(values.username);
    email !== values.email &&
      updateUserEmail(values.email).catch((error) => {
        AppLog(error, 'error caught is ');
        if (error.code === 'auth/requires-recent-login') {
          setIsReAuth(true);
        }
      });
    setDisabled(true);
    setSubmitDisabled(true);
  }

  function handleEdit() {
    setDisabled(false);
    setSubmitDisabled(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">profile from Provider</Typography>
      <CardHeader
        avatar={
          <Avatar
            className={classes.avatar}
            alt={values.username}
            src={user && user.photoURL}
          />
        }
        title={
          <Typography variant="caption" onClick={handleEdit}>
            {t('form:guide.edit')}
          </Typography>
        }
      />

      <form className={classes.form} noValidate>
        <TextField
          error={errors.username !== ''}
          helperText={errors.username}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled={disabled}
          id="username"
          label={t('form:textField.username.label')}
          name="username"
          // autoComplete="username"
          autoFocus
          value={values.username}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          disabled={
            values.provider === ('password' || 'phone') ? disabled : true
          }
          fullWidth
          name="email"
          label={t('form:textField.email.label')}
          id="email"
          // autoComplete="Email"
          value={values.email}
          onChange={onChange}
        />
        {providerId === 'phone' && (
          <TextField
            variant="outlined"
            margin="normal"
            disabled={disabled}
            fullWidth
            name="phone"
            label={t('form:textField.phone.label')}
            id="phone"
            value={values.phone}
            onChange={onChange}
          />
        )}

        {providerId === 'facebook.com' && (
          <TextField
            variant="outlined"
            margin="normal"
            disabled={disabled}
            fullWidth
            name="birthDate"
            label={t('form:textField.birthDate.label')}
            id="birthDate"
            // autoComplete="Email"
            value={values.birthDate}
            onChange={onChange}
          />
        )}

        <TextField
          variant="outlined"
          margin="normal"
          disabled={
            values.provider === ('password' || 'phone') ? disabled : true
          }
          fullWidth
          name="provider"
          label={t('form:textField.provider.label')}
          id="provider"
          value={values.provider}
          onChange={onChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          disabled={
            values.provider === ('password' || 'phone') ? disabled : true
          }
          fullWidth
          name="uid"
          label={t('form:textField.uid.label')}
          id="uid"
          value={values.uid}
          onChange={onChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={submitDisabled}
          onClick={onSubmit}
        >
          {t('form:buttons.submit')}
        </Button>
      </form>

      {reAuthComponent}
      {/* </div> */}
    </Container>
  );
}
