import React from 'react';

interface InputProps {
  onChange: (val: string) => void;
}

const Input: React.FC<InputProps> = ({ onChange }) => (
  <input type="text" onChange={({ target: { value } }) => onChange(value)} />
);

export default Input;
