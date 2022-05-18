import React, { useState } from 'react';
import Spinner from '../Spinner';
import styles from './styles.module.scss';

interface FormProps {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

const Form = ({ setUrl, loading }: FormProps) => {
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(input);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Convert song</h2>
      <label htmlFor="url">
        <p className={styles.labelText}>Youtube link:</p>
        <input
          type="text"
          name="url"
          value={input}
          onChange={handleChange}
          className={styles.input}
          disabled={loading}
          required
        />
      </label>
      <button
        type="submit"
        className={`${styles.submitButton} ${loading ? styles.submitButtonDisabled : styles.submitButtonActive}`}
        disabled={loading}
      >
        {loading ? <Spinner /> : 'Get Song'}
      </button>
    </form>
  );
};

export default Form;
