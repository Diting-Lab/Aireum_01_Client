import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MediaCard from '../Components/MediaCard';

import { AppLog } from '../utils/services/appLog';
import { contentsRef } from '../utils/firebase/firebaseAuth';
import { getMyContent } from '../utils/services/contentServices';
import ContentGrid from '../Components/ContentGrid';

const useStyles = makeStyles((theme) => ({
  divRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  root: {
    // flexGrow: 1,
    flexWrap: 'nowrap',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
export default function Page_MyContent() {
  const classes = useStyles();
  const [categoryList, setCategoryList] = useState(<p>loading</p>);

  useEffect(() => {
    setCategoryList(<ContentGrid uid="cuXid34VlFOpCM71aK0xEAnWOqB2" />);
  }, []);

  return (
    <>
      <p>this is my content page</p>
      {categoryList}
    </>
  );
}
