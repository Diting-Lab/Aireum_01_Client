/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useTranslation } from 'react-i18next';

/***************************************************************
 * Custom Components
 ***************************************************************/
import AppBar from '../Components/AppBar';
import { AppLog, setModuleName } from '../utils/services/appLog';
import {
  updateContext,
  getContext,
  isLoggedIn,
} from '../utils/helpers/appContext';
import LocalStorageContent from '../Components/LocalStorageContent';

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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Page_Welcome() {
  setModuleName('Page_Weocome');
  const user = getContext('user');
  const guest = getContext('guest');
  AppLog(user, 'user called from landing page is ');
  AppLog(isLoggedIn(), 'user is logged in? ');
  const history = useHistory();
  const { i18n } = useTranslation();

  const setLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    updateContext('guest', { languageSelected: true });
    history.push('/home');
  };

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">
        Welcome, please select language you prefer.
      </h2>
      <p id="simple-modal-description">
        Bienvenue, veuillez sélectionner la langue que vous préférez.
      </p>
      <button
        type="button"
        onClick={setLanguage}
        style={{ marginLeft: '90px' }}
        value="en"
      >
        English
      </button>
      <button
        type="button"
        onClick={setLanguage}
        style={{ marginLeft: '60px' }}
        value="zhCN"
      >
        Française
      </button>
    </div>
  );

  AppLog(process.env.REACT_APP_TRACE_MODE, 'trace mode is ');
  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ alignContent: 'center' }}
      >
        {body}
      </Modal>
    </div>
  );
}
