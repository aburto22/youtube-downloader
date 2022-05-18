import React, { useState } from 'react';
import Spinner from '../Spinner';
import { ISong } from '../../types';
import { fetchSong } from '../../lib/youtube';
import styles from './styles.module.scss';

interface FormProps {
  setSong: React.Dispatch<React.SetStateAction<ISong | null>>;
}

const Form = ({ setSong }: FormProps) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const json = await fetchSong('/api/youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (json.status === 'error') {
      setLoading(false);
      setErrorMessage(`${json.code}: ${json.message}`);
      return;
    }

    setSong(json.data);
    setLoading(false);
    setUrl('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setErrorMessage('');
  };

  const youtubeRegex = /(?:https?:\/\/)?(www\.)?youtube\.com\/watch\?.*v=[A-Za-z]+(?:&|\b)/;

  const urlValid = url.length === 0 || youtubeRegex.test(url);

  const buttonDisabled = loading || errorMessage.length > 0 || !youtubeRegex.test(url);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Convert song</h2>
      {errorMessage && (
        <div className={styles.errorContainer}>
          <h3 className={styles.errorTitle}>Error:</h3>
          <p className={styles.errorMessage}>{errorMessage}</p>
        </div>
      )}
      <label htmlFor="url">
        <p className={styles.labelText}>Youtube link:</p>
        <input
          type="text"
          name="url"
          value={url}
          onChange={handleChange}
          className={styles.input}
          disabled={loading}
          required
        />
      </label>
      {!urlValid && <p className={styles.urlMessage}>Insert valid youtube url.</p>}
      <button
        type="submit"
        className={`${styles.submitButton} ${buttonDisabled ? styles.submitButtonDisabled : styles.submitButtonActive}`}
        disabled={buttonDisabled}
      >
        {loading ? <Spinner /> : 'Get Song'}
      </button>
    </form>
  );
};

export default Form;
