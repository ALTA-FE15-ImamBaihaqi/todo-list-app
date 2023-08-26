import React, { FC } from 'react';

interface InputProps {
  id: string;
  name?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({ id, name, type, placeholder, onChange }) => {
  return (
    <input
      className="shadow rounded my-1 w-full h-11 py-2 px-3 text-slate-700 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
