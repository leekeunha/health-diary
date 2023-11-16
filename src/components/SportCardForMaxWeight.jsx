import React, { useEffect } from 'react';

export default function SportCardForMaxWeight({
  sport,
  sport: { id, name },
}) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sport);
  }, []);

  return (
    <div
      className='bg-sky-100 flex justify-center items-center h-24 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 m-3'
      onClick={() => navigate('/sportHistories', { state: { sport } })}
    >
      <span className='text-2xl'>{name}</span>
    </div>
  );
}
