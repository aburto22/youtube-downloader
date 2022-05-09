/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect } from 'react';

interface AudioProps {
  url: string;
}

const Audio = ({ url }: AudioProps) => {
  const [title, setTitle] = useState('');
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      const data = await fetch('/api/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
        .then((res) => res.json());

      setTitle(data.title);
      setSrc(data.src);
      setLoading(false);
    };

    if (url) {
      setLoading(true);
      fetchSong();
    }
  }, [url]);

  return (
    loading ? <p>Loading...</p> : (
      <div>
        <h2>{title}</h2>
        <audio controls>
          <source src={src} />
        </audio>
        <a href={src} download={title}>Download song</a>
      </div>
    )
  );
};

export default Audio;
