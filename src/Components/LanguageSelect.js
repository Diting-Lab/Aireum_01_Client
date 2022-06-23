/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useTranslation } from 'react-i18next';
import * as AppContext from '../utils/helpers/appContext';

/***************************************************************
 * Custom Components
 ***************************************************************/

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // backgroundColor: 'transparent',
    // minWidth: 120,
  },
}));

export default function LanguageSelect() {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const profile = AppContext.getContext('appProfile');
  const locale = profile
    ? profile.preference.locale
    : // : process.env.REACT_APP_DEFAULT_LOCALE;
      i18n.language;
  console.log('locale from appBar is ', locale);

  useEffect(() => {}, [locale]);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    profile &&
      AppContext.updateAppProfile(profile.uid, {
        'preference.locale': e.target.value,
      });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel color="primary">Language</InputLabel>
        <NativeSelect
          defaultValue={locale}
          onChange={changeLanguage}
          color="primary"
        >
          <option value="en">English</option>
          <option value="zhCN">中文</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}
