/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React, { useState } from 'react';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

/***************************************************************
 * Custom Components
 ***************************************************************/

export default function AudioPlaylistPlayerComponent({ URLs, handlePlay }) {
  // pass an url array

  const [count, setCount] = useState(0);
  console.log('count is ', count);

  const customIcons = {
    next: <SkipNextIcon fontSize="large" color="action" />,
    previous: (
      <SkipPreviousIcon
        fontSize="large"
        color={count > 0 ? 'action' : 'disabled'}
      />
    ),
  };
  return (
    <>
      <AudioPlayer
        src={URLs[count]}
        showSkipControls={true}
        autoPlay
        handlePlay={(e) => {
          console.log('play e is ', e);
        }}
        onPlay={(e) => {
          handlePlay();
          console.log('onPlay');
        }}
        customIcons={customIcons}
        onPause={(e) => {
          handlePlay();
          console.log('onPause');
        }}
        onCl
        onClickPrevious={() => {
          console.log('on previous is clicked');
          count > 0 && setCount(count - 1);
        }}
        onEnded={() => {
          console.log('current play ends, play next');
          setCount(count + 1);
        }}
        onClickNext={() => {
          console.log('on next is clicked');
          count < URLs.length - 1 ? setCount(count + 1) : setCount(0);
        }}
        style={{
          width: '95%',
          boxShadow: 'none',
          backgroundColor: 'transparent',
          fontFamily: 'cursive',
        }}
      />
    </>
  );
}
