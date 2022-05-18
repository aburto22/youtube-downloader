/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { ISong } from '../../types';
import styles from './styles.module.scss';

interface AudioProps {
  song: ISong;
  handleClick: () => void;
}

const Audio = ({ song, handleClick }: AudioProps) => (
  <>
    <h2 className={styles.title}>{song.title}</h2>
    <audio controls className={styles.audio}>
      <source src={song.src} />
    </audio>
    <a href={song.src} download={song.title} className={styles.downloadLink}>Download song</a>
    <button type="button" onClick={handleClick} className={styles.restartButton}>Convert another song</button>
  </>
);

export default Audio;
