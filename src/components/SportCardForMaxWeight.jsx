import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SportCardForMaxWeight({
  sport,
  sport: { name },
}) {
  const navigate = useNavigate();

  return (
    <div
      className='bg-sky-100 flex justify-center items-center h-24 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 m-3'
      onClick={() => navigate('/sportHistories', { state: { sport } })}
    >
      <span className='text-2xl'>{name}</span>
    </div>
  );
}
