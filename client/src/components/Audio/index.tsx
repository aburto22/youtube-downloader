/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { ISong } from '../../types';

interface AudioProps {
  song: ISong;
}

const Audio = ({ song }: AudioProps) => (
  <div>
    <h2>{song.title}</h2>
    <audio controls>
      <source src={song.src} />
    </audio>
    <a href={song.src} download={song.title}>Download song</a>
  </div>
);

export default Audio;
