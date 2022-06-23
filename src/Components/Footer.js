import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'white',
    fontSize: '20px',
    color: 'white',
    borderTop: '1px solid #E7E7E7',
    textAlign: 'center',
    padding: '20px',
    position: 'fixed',
    left: '250',
    right: '0',
    bottom: '13vh',
    height: '60px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      // left: '0',
      width: '100%',
    },
  },
  phantomStyle: {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
  },
}));

export default function Footer({ children }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.phantomStyle} />
      <div className={classes.footer}>{children}</div>
    </div>
  );
}
