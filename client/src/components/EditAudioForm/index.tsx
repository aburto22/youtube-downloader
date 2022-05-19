import React, { useState } from 'react';
import Spinner from '../Spinner';
import { ISong } from '../../types';
import { fetchSong } from '../../lib/youtube';
import { secsToMins, checkSongHasChanged } from '../../lib/time';
import TimeInput from '../TimeInput';
import styles from './styles.module.scss';

interface EditAudioFormProps {
  song: ISong;
  setSong: React.Dispatch<React.SetStateAction<ISong | null>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAudioForm = ({ song, setSong, setIsEdit }: EditAudioFormProps) => {
  const duration = Math.round(song.duration);

  const [start, setStart] = useState({ sec: 0, min: 0 });
  const [end, setEnd] = useState({
    sec: duration % 60,
    min: Math.floor(duration / 60),
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkSongHasChanged(start, end, duration)) {
      setIsEdit(false);
      return;
    }

    const data = {
      title: song.title,
      base64: song.base64,
      bitrate: song.bitrate,
      start: start.min * 60 + start.sec,
      end: end.min * 60 + end.sec,
    };

    setLoading(true);

    const json = await fetchSong('/api/youtube/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (json.status === 'error') {
      setLoading(false);
      setErrorMessage(`${json.code}: ${json.message}`);
      return;
    }

    setLoading(false);
    setIsEdit(false);
    setSong(json.data);
  };

  const buttonDisabled = loading;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {errorMessage && (
        <div className={styles.errorContainer}>
          <h3 className={styles.errorTitle}>Error:</h3>
          <p className={styles.errorMessage}>{errorMessage}</p>
        </div>
      )}
      <h3 className={styles.audioDuration}>
        {`Audio duration: ${secsToMins(duration)} ${duration > 60 ? 'min(s)' : 'sec(s)'}`}
      </h3>
      <TimeInput label="start" time={start} other={end} duration={duration} setTime={setStart} loading={loading} />
      <TimeInput label="end" time={end} other={start} duration={duration} setTime={setEnd} loading={loading} />
      <button
        type="submit"
        className={`${styles.submitButton} ${buttonDisabled ? styles.submitButtonDisabled : styles.submitButtonActive}`}
        disabled={buttonDisabled}
      >
        {loading ? <Spinner /> : 'Save edit'}
      </button>
    </form>
  );
};

export default EditAudioForm;
