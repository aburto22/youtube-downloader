import React, { useState, useMemo } from 'react';
import { ISong } from '../../types';
import DownloadAudio from '../DownloadAudio';
import EditAudioForm from '../EditAudioForm';
import AudioPlayer from '../AudioPlayer';
import styles from './styles.module.scss';

interface AudioProps {
  song: ISong;
  setSong: React.Dispatch<React.SetStateAction<ISong | null>>;
}

const Audio = ({ song, setSong }: AudioProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleClickRestart = () => {
    setSong(null);
  };

  const src = useMemo(() => `data:audio/mp3;base64,${song.base64}`, [song.base64]);

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>{song.title}</h2>
        <AudioPlayer src={src} />
      </header>
      {isEdit
        ? <EditAudioForm song={song} setSong={setSong} setIsEdit={setIsEdit} />
        : <DownloadAudio song={song} setIsEdit={setIsEdit} src={src} />}
      <footer className={styles.footer}>
        <button type="button" onClick={handleClickRestart} className={styles.restartButton}>Convert another song</button>
      </footer>
    </>
  );
};

export default Audio;
