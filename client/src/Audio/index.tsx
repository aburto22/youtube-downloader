import React from 'react';

interface AudioProps {
  url: string;
}

const Audio = ({ url }: AudioProps) => (
  <p>{url}</p>
);

export default Audio;
