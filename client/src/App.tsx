import React, { useState } from 'react';
import Form from './Form';
import Audio from './Audio';
import './App.css';

const App = () => {
  const [url, setUrl] = useState('');

  return (
    <div className="App">
      <Form setUrl={setUrl} />
      {url && <Audio url={url} />}
    </div>
  );
};

export default App;
