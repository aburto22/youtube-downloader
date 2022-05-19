/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import EditAudioForm from '../EditAudioForm';
import { ISong } from '../../types';
import styles from './styles.module.scss';

interface EditAudioProps {
  song: ISong;
  setSong: React.Dispatch<React.SetStateAction<ISong | null>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAudio = ({ song, setSong, setIsEdit }: EditAudioProps) => {
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
      <EditAudioForm song={song} setSong={setSong} setIsEdit={setIsEdit} />
      <button type="button" onClick={handleClick} className={styles.restartButton}>Convert another song</button>
    </>
  );
};

export default EditAudio;
