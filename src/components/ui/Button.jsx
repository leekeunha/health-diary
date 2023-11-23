import React from 'react';

export default function Button({ text, onClick, className, disabled }) {
  const baseClass = 'bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110';
  const disabledClass = 'bg-red-300 cursor-not-allowed';
  const finalClass = `${baseClass} ${className || ''} ${disabled ? disabledClass : ''}`;
  return (
    <button
      className={finalClass}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
