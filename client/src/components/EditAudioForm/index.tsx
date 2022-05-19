import React, { useState } from 'react';
import Spinner from '../Spinner';
import { ISong } from '../../types';
import { fetchSong } from '../../lib/youtube';
import { getDispTime, secsToMins } from '../../lib/time';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    setLoading(false);

    if (json.status === 'error') {
      return;
    }

    setIsEdit(false);
    setSong(json.data);
  };

  const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = {
      ...start,
      [e.target.name]: +e.currentTarget.value,
    };

    const secs = time.min * 60 + time.sec;
    const secsEnd = end.min * 60 + end.sec;

    if (time.min >= 0 && time.sec <= 60 && secs >= 0 && secs <= duration && secs < secsEnd) {
      setStart(time);
    }
  };

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = {
      ...end,
      [e.target.name]: +e.currentTarget.value,
    };

    const secs = time.min * 60 + time.sec;
    const secsStart = start.min * 60 + start.sec;

    if (time.min >= 0 && time.sec <= 60 && secs > secsStart && secs <= duration && secs >= 0) {
      setEnd(time);
    }
  };

  const buttonDisabled = loading;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.audioDuration}>
        {`Audio duration: ${secsToMins(duration)} min(s)`}
      </p>
      <label htmlFor="start" className={styles.label}>
        <p className={styles.labelText}>Start:</p>
        <input
          type="number"
          name="min"
          value={getDispTime(start.min)}
          onChange={handleChangeStart}
          className={styles.input}
          disabled={loading}
          required
        />
        <p className={styles.timeSeparator}>:</p>
        <input
          type="number"
          name="sec"
          value={getDispTime(start.sec)}
          onChange={handleChangeStart}
          className={`${styles.input} ${styles.inputLast}`}
          disabled={loading}
          required
        />
      </label>
      <label htmlFor="end" className={styles.label}>
        <p className={styles.labelText}>End:</p>
        <input
          type="number"
          name="min"
          value={getDispTime(end.min)}
          onChange={handleChangeEnd}
          className={styles.input}
          disabled={loading}
          required
        />
        <p className={styles.timeSeparator}>:</p>
        <input
          type="number"
          name="sec"
          value={getDispTime(end.sec)}
          onChange={handleChangeEnd}
          className={`${styles.input} ${styles.inputLast}`}
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
