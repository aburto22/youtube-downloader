/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { ISong } from '../../types';
import DownloadAudio from '../DownloadAudio';
import styles from './styles.module.scss';

interface AudioProps {
  song: ISong;
  setSong: React.Dispatch<React.SetStateAction<ISong | null>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Audio = ({ song, setSong, setIsEdit }: AudioProps) => {
  const handleClickRestart = () => {
    setSong(null);
  };

  const src = `data:audio/mp3;base64,${song.base64}`;

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>{song.title}</h2>
        <audio controls className={styles.audio}>
          <source src={src} />
        </audio>
      </header>
      <DownloadAudio song={song} setIsEdit={setIsEdit} src={src} />
      <footer className={styles.footer}>
        <button type="button" onClick={handleClickRestart} className={styles.restartButton}>Convert another song</button>
      </footer>
    </>
  );
};

export default Audio;
