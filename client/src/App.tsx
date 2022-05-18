import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Audio from './components/Audio';
import Header from './components/Header';
import Footer from './components/Footer';
import { ISong } from './types';
import styles from './App.module.scss';

const App = () => {
  const [url, setUrl] = useState('');
  const [song, setSong] = useState<ISong | null>({ title: 'text', src: 'test' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      if (!url) {
        return;
      }

      setLoading(true);

      // setTimeout(() => setLoading(false), 2000);

      const data = await fetch('/api/youtube/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
        .then((res) => res.json());

      setSong(data);
      setLoading(false);
    };

    fetchSong();
  }, [url]);

  const handleClick = () => {
    setSong(null);
    setLoading(false);
    setUrl('');
  };

  return (
    <div className={`App ${styles.app}`}>
      <Header />
      <main className={styles.main}>
        <section className={styles.section}>
          {song ? (
            <Audio song={song} handleClick={handleClick} />
          ) : (
            <Form setUrl={setUrl} loading={loading} />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
