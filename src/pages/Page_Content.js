/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React from 'react';
import Link from '@material-ui/core/Link';
import { withTranslation } from 'react-i18next';

/***************************************************************
 * Custom Components
 ***************************************************************/
import { AppLog } from '../utils/services/appLog';
import { getContext, isLoggedIn } from '../utils/helpers/appContext';
import LocalStorageContent from '../Components/LocalStorageContent';

function Page_Content(props) {
  const user = getContext('user');

  AppLog(user, 'user called from content page is ');
  AppLog(isLoggedIn(), 'user is logged in? ');

  return (
    <div>
      {!user.displayName && (
        <Link href="/settings" variant="body2">
          {'Please update your profile'}
        </Link>
      )}
      {process.env.REACT_APP_TRACE_MODE === 'T' && <LocalStorageContent />}
    </div>
  );
}

export default withTranslation()(Page_Content);
