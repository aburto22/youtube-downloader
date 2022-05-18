import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Audio from './components/Audio';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './App.module.scss';

const App = () => {
  const [url, setUrl] = useState('');
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      if (!url) {
        return;
      }

      setLoading(true);

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
        {song ? (
          <>
            <Audio song={song} />
            <button type="button" onClick={handleClick}>Convert another song</button>
          </>
        ) : (
          <>
            <Form setUrl={setUrl} />
            {loading && <p>Loading...</p>}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
