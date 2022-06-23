/***************************************************************
 * React & Third Party Components
 ***************************************************************/
import React from 'react';

/***************************************************************
 * Custom Components
 ***************************************************************/

export default function VideoPlayer({ Poster, Movie_Title, URL }) {
  return (
    <video
      src={URL}
      width={800}
      controls
      autoPlay
      // poster={Poster}
    />
  );
}
