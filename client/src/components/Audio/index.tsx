/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { ISong } from '../../types';
import styles from './styles.module.scss';

interface AudioProps {
  song: ISong;
  setSong: React.Dispatch<React.SetStateAction<ISong | null>>;
}

const Audio = ({ song, setSong }: AudioProps) => {
  const title = song.title.split('.').slice(0, -1).join('');

  const handleClick = () => {
    setSong(null);
  };

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <audio controls className={styles.audio}>
        <source src={song.src} />
      </audio>
      <a href={song.src} download={song.title} className={styles.downloadLink}>Download song</a>
      <button type="button" onClick={handleClick} className={styles.restartButton}>Convert another song</button>
    </>
  );
};

export default Audio;
