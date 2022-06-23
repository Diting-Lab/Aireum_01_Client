/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React from 'react';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

/***************************************************************
 * Custom Components
 ***************************************************************/

export default function AudioPlayerComponent({ URL, handlePlay }) {
  return (
    <>
      <AudioPlayer
        src={URL}
        showSkipControls={true}
        // autoPlay
        handlePlay={(e) => {
          console.log('play e is ', e);
        }}
        onPlay={(e) => {
          handlePlay();
          console.log('onPlay');
        }}
        onPause={(e) => {
          handlePlay();
          console.log('onPause');
        }}
        style={{
          width: '95%',
          boxShadow: 'none',
          // backgroundColor: 'transparent',
          fontFamily: 'cursive',
        }}
      />
    </>
  );
}
