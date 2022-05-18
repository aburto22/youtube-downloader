import React from 'react';
import styles from './styles.module.scss';

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.title}>Youtube Downloader</h1>
    <p className={styles.text}>Where you can get amazing songs from YouTube</p>
  </header>
);

export default Header;
