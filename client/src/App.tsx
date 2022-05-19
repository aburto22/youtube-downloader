import React, { useState } from 'react';
import Form from './components/Form';
import Audio from './components/Audio';
import Header from './components/Header';
import Footer from './components/Footer';
import { ISong } from './types';
import styles from './App.module.scss';

const App = () => {
  const [song, setSong] = useState<ISong | null>(null);

  return (
    <div className={`App ${styles.app}`}>
      <Header />
      <main className={styles.main}>
        <section className={styles.section}>
          {song
            ? <Audio song={song} setSong={setSong} />
            : <Form setSong={setSong} /> }
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
