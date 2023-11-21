import React from 'react';

export default function Button({ text, onClick, className }) {
  const baseClass = 'bg-brand text-white py-2 px-4 rounded-sm hover:brightness-110';
  const finalClass = `${baseClass} ${className || ''}`;
  console.log({ className });
  return (
    <button
      className={finalClass}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
