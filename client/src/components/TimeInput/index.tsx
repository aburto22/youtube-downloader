import React from 'react';
import { getDispTime } from '../../lib/time';
import styles from './styles.module.scss';

interface ITime {
  min: number;
  sec: number;
}

interface TimeInputProps {
  time: ITime;
  other: ITime;
  setTime: React.Dispatch<React.SetStateAction<ITime>>;
  duration: number;
  loading: boolean;
  label: string;
}

const TimeInput = ({
  time, other, setTime, duration, loading, label,
}: TimeInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name.split('-')[1];

    const newTime = {
      ...time,
      [name]: +e.currentTarget.value,
    };

    const secs = newTime.min * 60 + newTime.sec;
    const secsOther = other.min * 60 + other.sec;

    const validator = label === 'start'
      ? newTime.min >= 0 && newTime.sec <= 60 && secs >= 0 && secs <= duration && secs < secsOther
      : newTime.min >= 0 && newTime.sec <= 60 && secs >= 0 && secs <= duration && secs > secsOther;

    if (validator) {
      setTime(newTime);
    }
  };

  const title = label.slice(0, 1).toUpperCase() + label.slice(1);

  return (
    <label htmlFor="start" className={styles.label}>
      <p className={styles.labelText}>{`${title}:`}</p>
      <input
        type="number"
        name={`${label}-min`}
        value={getDispTime(time.min)}
        onChange={handleChange}
        className={styles.input}
        disabled={loading}
        required
      />
      <p className={styles.timeSeparator}>:</p>
      <input
        type="number"
        name={`${label}-sec`}
        value={getDispTime(time.sec)}
        onChange={handleChange}
        className={`${styles.input} ${styles.inputLast}`}
        disabled={loading}
        required
      />
    </label>
  );
};

export default TimeInput;
