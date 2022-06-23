/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { AppLog, setModuleName } from '../utils/services/appLog';
import { useForm } from '../utils/helpers/hooks';
import { reAuth } from '../utils/firebase/firebaseAuth';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    width: 400, // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function ReAuthModal({ isReAuth }) {
  setModuleName('ReAuthModal');
  const classes = useStyles();
  const [open, setOpen] = React.useState(isReAuth);
  const [modalStyle] = React.useState(getModalStyle);
  const [errors, setErrors] = useState({ email: '', password: '' });
  AppLog(open, 'open is ');
  AppLog(errors, 'errors is');

  const { onChange, onSubmit, values } = useForm(reAuthUser, {
    reAuthEmail: '',
    reAuthPassword: '',
  });

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Please Re-Authenticate</h2>
      <p id="simple-modal-description">
        For security-sensitive concern, please re-authenticate before furthur
        actions.
      </p>
      <form className={classes.form} noValidate>
        <TextField
          error={errors.email !== ''}
          helperText={errors.email}
          variant="outlined"
          margin="normal"
          fullWidth
          id="reAuthEmail"
          label="Email"
          required
          name="reAuthEmail"
          // autoComplete="username"
          autoFocus
          value={values.reAuthEmail}
          onChange={onChange}
        />
        <TextField
          error={errors.password !== ''}
          helperText={errors.password}
          variant="outlined"
          margin="normal"
          fullWidth
          name="reAuthPassword"
          label="Password"
          required
          id="reAuthPassword"
          type="password"
          // autoComplete="Email"
          value={values.reAuthPassword}
          onChange={onChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );

  function reAuthUser() {
    reAuth(values.reAuthEmail, values.reAuthPassword)
      .then((result) => {
        AppLog(result, 'result is ');
        setOpen(false);
      })
      .catch((error) => {
        AppLog(error, 'error when re auth ');
        if (error.code === 'auth/wrong-password') {
          setErrors({ ...errors, password: 'wrong password' });
        }
        if (error.code === 'auth/user-mismatch') {
          setErrors({ ...errors, email: "user doesn't match" });
        }
        if (error.code === 'auth/invalid-email') {
          setErrors({ ...errors, email: 'invalid email' });
        }
      });
  }

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
