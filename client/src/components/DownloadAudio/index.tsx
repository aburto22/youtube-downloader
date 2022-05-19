import React from 'react';
import { ISong } from '../../types';
import styles from './styles.module.scss';

interface DownloadAudioProps {
  song: ISong;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  src: string;
}

const DownloadAudio = ({ song, setIsEdit, src }: DownloadAudioProps) => {
  const handleClickEdit = () => {
    setIsEdit(true);
  };

  return (
    <main className={styles.main}>
      <button type="button" onClick={handleClickEdit} className={styles.editButton}>Edit song</button>
      <a href={src} download={`${song.title}.mp3`} className={styles.downloadLink}>Download song</a>
    </main>
  );
};

export default DownloadAudio;
