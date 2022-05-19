import React, { useState } from 'react';
import Spinner from '../Spinner';
import { ISong } from '../../types';
import { fetchSong } from '../../lib/youtube';
import styles from './styles.module.scss';

interface EditAudioFormProps {
  song: ISong;
  setSong: React.Dispatch<React.SetStateAction<ISong | null>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditAudioForm = ({ song, setSong, setIsEdit }: EditAudioFormProps) => {
  const duration = Math.round(song.duration);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(duration);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title: song.title,
      base64: song.base64,
      bitrate: song.bitrate,
      start,
      end,
    };

    setLoading(true);

    const json = await fetchSong('/api/youtube/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (json.status === 'error') {
      return;
    }

    setIsEdit(false);
    setSong(json.data);
  };

  const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = +e.currentTarget.value;

    if (time >= 0 && time <= duration && time < end) {
      setStart(+e.currentTarget.value);
    }
  };

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = +e.currentTarget.value;

    if (time >= 0 && time <= duration && time > start) {
      setEnd(+e.currentTarget.value);
    }
  };

  const buttonDisabled = loading;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.audioDuration}>
        {`Audio duration: ${duration}s`}
      </p>
      <label htmlFor="start" className={styles.label}>
        <p className={styles.labelText}>Start (s):</p>
        <input
          type="number"
          name="start"
          value={start}
          onChange={handleChangeStart}
          className={styles.input}
          disabled={loading}
          required
        />
      </label>
      <label htmlFor="end" className={styles.label}>
        <p className={styles.labelText}>End (s):</p>
        <input
          type="number"
          name="end"
          value={end}
          onChange={handleChangeEnd}
          className={styles.input}
          disabled={loading}
          required
        />
      </label>
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
