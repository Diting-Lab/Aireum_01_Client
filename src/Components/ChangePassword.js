/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState, useContext, useEffect } from 'react';
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
import { updateUserPassword, reAuth } from '../utils/firebase/firebaseAuth';
import { getContext, setContext } from '../utils/helpers/appContext';
import { MessagesContext } from '../utils/context/contextMessages';

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

export default function ChangePassword() {
  setModuleName('ChangePassword');

  const { messages, addMessage, updateMessage } = useContext(MessagesContext);
  AppLog(messages, 'messages from context is ');
  AppLog(messages.length, 'message length is ');

  // useEffect(() => {
  //   !messages.changePassword && addMessage({ changePassword: {} });
  // }, []);

  const { t } = useTranslation();

  const [disabled, setDisabled] = useState(true);
  const classes = useStyles();
  const user = getContext('user');
  const profile = getContext('appProfile');

  const { email } = profile;

  const { onChange, onSubmit, values } = useForm(callbackUpdatePassword, {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    updateMessage({ changePassword: errors });

    // TODO: save messages in local storage
    // setContext('errors', { changePassword: errors });
  }, [errors]);
  //
  // getErrors = (errors) => {
  //   AppLog(
  //     'get errors is called from change password component',
  //     'callback status '
  //   );
  //   return errors;
  // };
  // let submitDisabled = values.username === '';
  const [submitDisabled, setSubmitDisabled] = useState(true);

  //update profile
  function callbackUpdatePassword() {
    if (values.oldPassword === '') {
      setErrors({ ...errors, oldPassword: 'password can not be empty' });
      // updateMessage({ 'changePassword.oldPassword': 'password too short' });
    }
    if (values.newPassword === '') {
      setErrors({ ...errors, newPassword: 'password can not be empty' });
      // updateMessage({
      //   'changePassword.newPassword': 'password can not be empty',
      // });
      return;
    }
    if (values.newPassword.length < 6) {
      setErrors({ ...errors, newPassword: 'password too short' });
      // updateMessage({ 'changePassword.newPassword': 'password too short' });
      // return;
    }
    if (values.newPassword !== values.confirmNewPassword) {
      setErrors({ ...errors, confirmNewPassword: "password doesn't match" });
      // updateMessage({
      //   'changePassword.confirmPassword': "password doesn't match",
      // });
      return;
    }

    reAuth(email, values.oldPassword)
      .then((result) => {
        AppLog(result, 're auth result is ');

        updateUserPassword(values.newPassword).then((result) => {
          AppLog(result, 'update password result is ');
        });
      })
      .then(() => {
        setDisabled(true);
        setSubmitDisabled(true);
        setErrors({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
        alert('Password changed successfully!');
      })
      .catch((error) => {
        AppLog(error, 'error when change password ');
        if (error.code === 'auth/wrong-password') {
          setErrors({ ...errors, oldPassword: 'wrong password' });
          // updateMessage({ 'changePassword.oldPassword': 'wrong password' });
        }
        if (error.code === 'auth/user-mismatch') {
          setErrors({ ...errors, oldPassword: "user doesn't match" });
          // updateMessage({ 'changePassword.oldPassword': "user doesn't match" });
        }
        if (error.code === 'auth/internal-error') {
          setErrors({ ...errors, oldPassword: 'password can not be empty' });
          // updateMessage({
          //   'changePassword.oldPassword': 'password can not be empty',
          // });
          return;
        }
      });

    // updateUserPassword(values.newPassword)
    //   .then((result) => {
    //     AppLog(result, 'result is ');
    //   })
    //   .catch((error) => {
    //     AppLog(error, 'error when update pasword ');
    //   });
  }

  function handleEdit() {
    setDisabled(false);
    setSubmitDisabled(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">Change password</Typography>
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
          error={errors.oldPassword !== ''}
          helperText={errors.oldPassword}
          variant="outlined"
          margin="normal"
          disabled={disabled}
          fullWidth
          type="password"
          name="oldPassword"
          label={t('form:textField.oldPassword.label')}
          id="oldPassword"
          value={values.oldPassword}
          onChange={onChange}
        />

        <TextField
          error={errors.newPassword !== ''}
          helperText={errors.newPassword}
          variant="outlined"
          margin="normal"
          disabled={disabled}
          fullWidth
          type="password"
          name="newPassword"
          label={t('form:textField.newPassword.label')}
          id="newPassword"
          // autoComplete="Email"
          value={values.newPassword}
          onChange={onChange}
        />

        <TextField
          error={errors.confirmNewPassword !== ''}
          helperText={errors.confirmNewPassword}
          variant="outlined"
          margin="normal"
          disabled={disabled}
          fullWidth
          type="password"
          name="confirmNewPassword"
          label={t('form:textField.confirmNewPassword.label')}
          id="confirmNewPassword"
          value={values.confirmNewPassword}
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

      {/* </div> */}
    </Container>
  );
}
