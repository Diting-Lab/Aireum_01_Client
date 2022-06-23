/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';
import { zhCN } from '@material-ui/core/locale';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import CssBaseline from '@material-ui/core/CssBaseline';
// Google Analytics
import ReactGA from 'react-ga';

/***************************************************************
 * Custom Components
 ***************************************************************/
import PageLanding from './pages/Page_Landing';
import PageLogin from './pages/Page_Login';
import PageContent from './pages/Page_Content';
import PageRegister from './pages/Page_Register';
import PrivateRoute from './Components/PrivateRoute';
import PagePublicHome from './pages/Page_Public_Home';
import PageChat from './pages/Page_Chat';
import PageMyContent from './pages/Page_MyContent';
import PageSettings from './pages/Page_Settings';
import PageMyAlbum from './pages/Page_MyAlbum';
import AppBar from './Components/AppBar';
import { MessageProvider } from './utils/context/contextMessages';
import ErrorBoundary from './utils/services/errorBoundary';

/***************************************************************
 * CSS
 ***************************************************************/
import './App.css';
import { deepPurple, teal, amber } from '@material-ui/core/colors';
import Image from './Images/Background.jpg';
import { AppLog } from './utils/services/appLog';
import PageMyPosts from './pages/Page_MyPosts';
// import PageSinglePost from './pages/_Page_SinglePost';
import PageWelcome from './pages/Page_Welcome';
import PageSingleMovie from './pages/Page_SingleMovie';
import PageVideoPlay from './pages/Page_VideoPlay';

import PageMovieHome from './pages/Page_MovieHome';
import PageRadioHome from './pages/Page_RadioHome';
import PageAudioPlay from './pages/Page_AudioPlay';
import PageSingleAudio from './pages/Page_SingleAudio';
import PageGalleryHome from './pages/Page_GalleryHome';
import PageSinglePost from './pages/Page_SinglePost';
import PageAlgoliaSearch from './pages/Page_AlgoliaSearch';
import Page_AudioPlaylistPlay from './pages/Page_AudioPlaylistPlay';
import PageFavorite from './pages/Page_Favorite';
import PagePopular from './pages/Page_Popular';
import BottomNav from './Components/BottomNav';

// const MEASUREMENT_ID = process.env.REACT_APP_GA_MESUREMENT_ID;

// console.log('MEASUREMENT_ID is', MEASUREMENT_ID);

// initialize Google Analytics
// ReactGA.initialize(MEASUREMENT_ID);

const theme = createTheme(
  {
    palette: {
      primary: {
        light: teal[500],
        main: teal[500],
        // dark: teal[500],
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffffff',
      },
      text: { main: teal[500] },

      // secondary: {
      //   light: '#b804c2',
      //   main: '#800187',
      //   // dark: will be calculated from palette.secondary.main,
      //   contrastText: '#ffffff',
      // },
      textPrimary: {
        light: teal[500],
        main: teal[500],
        contrastText: teal[500],
      },
    },
  },
  zhCN
);

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // width: '100%',
    minHeight: '120vh',
    // height: '30vh',
    // top: 0,
    // backgroundImage: `url(${Image})`,
    backgroundColor: '#ffffff',
    // opacity: 0.2,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPositionY: 'center',
    paddingTop: '60px',
    paddingLeft: '200px',
    paddingRight: '200px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0px',
      paddingRight: '0px',
      minHeight: '180vh',
    },

    // marginTop: '50px',
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function App({ props }) {
  const classes = useStyles();
  //trace();
  return (
    <MessageProvider>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.root}>
            <Router>
              <AppBar />
              <Switch>
                <Route exact path="/home" render={(props) => <PageLanding />} />
                <Route exact path="/" render={(props) => <PageLanding />} />
                <Route
                  exact
                  path="/favorite"
                  render={(props) => <PageFavorite />}
                />
                <Route
                  exact
                  path="/popular"
                  render={(props) => <PagePopular />}
                />
                <Route exact path="/logger" />
                {process.env.REACT_APP_SIGNIN_ENABLE === 'T' && (
                  <Route
                    exact
                    path="/login"
                    render={(props) => <PageLogin />}
                  />
                )}
                {process.env.REACT_APP_REGISTER_ENABLE === 'T' && (
                  <Route
                    exact
                    path="/register"
                    render={(props) => <PageRegister />}
                  />
                )}
                <Route
                  exact
                  path="/welcome"
                  render={(props) => <PageWelcome />}
                />
                // movies
                <Route
                  exact
                  path="/gallery/g=:gallery"
                  render={(props) => <PageGalleryHome />}
                />
                <Route
                  exact
                  path="/gallery/g=:gallery/q=:query"
                  render={(props) => <PageGalleryHome />}
                />
                <Route
                  exact
                  path="/gallery/g=:gallery/search=:search/q=:query"
                  render={(props) => <PageGalleryHome />}
                />
                {/* <Route
                exact
                path="/gallery/:gallery"
                render={(props) => <PageMovieHome />}
              /> */}
                <Route
                  exact
                  path="/p/info/:PostID"
                  render={(props) => <PageSinglePost />}
                />
                <Route
                  exact
                  path="/c/v/play/:DefaultPlayContentID"
                  render={(props) => <PageVideoPlay />}
                />
                <Route
                  exact
                  path="/c/a/play/:DefaultPlayContentID"
                  render={(props) => <PageAudioPlay />}
                />
                // play an audio playlist
                <Route
                  exact
                  path="/a/playlist/:playlistID"
                  render={(props) => <Page_AudioPlaylistPlay />}
                />
                {/* <PrivateRoute
                exact
                path="/content"
                render={(props) => <PageContent />}
              /> */}
                // radios
                <Route
                  exact
                  path="/radios"
                  render={(props) => <PageRadioHome />}
                />
                <Route
                  exact
                  path="/radios/c=:category/y=:year/a=:area/l=:language"
                  render={(props) => <PageRadioHome />}
                />
                <Route
                  exact
                  path="/radio/info/:AudioID"
                  render={(props) => <PageSingleAudio />}
                />
                <Route
                  exact
                  path="/radio/play/:AudioID"
                  render={(props) => <PageAudioPlay />}
                />
                <Route
                  exact
                  path="/browse"
                  render={(props) => <PageAlgoliaSearch />}
                />
                {/* <Route
                exact
                path="/search/search=:search/filter=:filter"
                render={(props) => <PageAlgoliaSearch />}
              />
              <Route
                exact
                path="/search/search=:search"
                render={(props) => <PageAlgoliaSearch />}
              /> */}
                <Route
                  exact
                  path="/browse/:filter"
                  render={(props) => <PageAlgoliaSearch />}
                />
                <PrivateRoute
                  exact
                  path="/content"
                  // render={(props) => <PagePublicHome />}
                  render={(props) => <PageLanding />}
                />
                <PrivateRoute
                  exact
                  path="/my_posts"
                  render={(props) => <PageMyPosts />}
                />
                {/* <PrivateRoute
                exact
                path="/post/:postID"
                render={(props) => <PageSinglePost />}
              /> */}
                <PrivateRoute
                  exact
                  path="/chat"
                  render={(props) => <PageChat />}
                />
                <PrivateRoute
                  exact
                  path="/user/:uid"
                  render={(props) => <PageMyAlbum />}
                />
                <PrivateRoute
                  exact
                  path="/settings/profile"
                  render={(props) => <PageSettings index={0} />}
                />
                <PrivateRoute
                  exact
                  path="/settings/account"
                  render={(props) => <PageSettings index={1} />}
                />
                <PrivateRoute
                  exact
                  path="/settings/privacy"
                  render={(props) => <PageSettings index={2} />}
                />
                <PrivateRoute
                  exact
                  path="/settings/notifications"
                  render={(props) => <PageSettings index={3} />}
                />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
              <BottomNav />
            </Router>
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    </MessageProvider>
  );
}

export default App;
