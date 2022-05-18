import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Audio from './components/Audio';
import Header from './components/Header';
import Footer from './components/Footer';
import { ISong } from './types';
import { fetchSong } from './lib/youtube';
import styles from './App.module.scss';

const App = () => {
  const [url, setUrl] = useState('');
  const [song, setSong] = useState<ISong | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getSong = async () => {
      if (!url) {
        return;
      }

      setLoading(true);

      const json = await fetchSong('/api/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (json.status === 'success') {
        setSong(json.data);
        setLoading(false);
        return;
      }

      setLoading(false);
      setMessage(`Error: ${json.code}: ${json.message}`);
    };

    getSong();
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
            <>
              <p>{message}</p>
              <Form setUrl={setUrl} loading={loading} />
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
