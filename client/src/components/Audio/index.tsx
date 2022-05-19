/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { ISong } from '../../types';
import styles from './styles.module.scss';

interface AudioProps {
  song: ISong;
  setSong: React.Dispatch<React.SetStateAction<ISong | null>>;
}

const Audio = ({ song, setSong }: AudioProps) => {
  const handleClick = () => {
    setSong(null);
  };

  const src = `data:audio/mp3;base64,${song.base64}`;

  return (
    <>
      <h2 className={styles.title}>{song.title}</h2>
      <audio controls className={styles.audio}>
        <source src={src} />
      </audio>
      <a href={src} download={`${song.title}.mp3`} className={styles.downloadLink}>Download song</a>
      <button type="button" onClick={handleClick} className={styles.restartButton}>Convert another song</button>
    </>
  );
};

export default Audio;
