import React, { FC } from 'react';

interface buttonProps {
  id: string;
  label?: string;
  onClick?: React.MouseEventHandler;
}
const Button: FC<buttonProps> = ({ id, label, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="w-20 bg-sky-700 text-white rounded hover:bg-sky-500 font-semibold h-8 my-1"
    >
      {label}
    </button>
  );
};

export default Button;
