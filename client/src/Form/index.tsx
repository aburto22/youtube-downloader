import React, { useState } from 'react';

interface FormProps {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const Form = ({ setUrl }: FormProps) => {
  const [input, setInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="url" value={input} onChange={handleChange} />
      <button type="submit">Get song</button>
    </form>
  );
};

export default Form;
