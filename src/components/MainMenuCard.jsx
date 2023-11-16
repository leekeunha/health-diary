import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainMenuCard({
  mainMenu: { id, name },
}) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        if (id === 0) {
          navigate(`/BodyParts/`);
        } else if (id === 1) {
          navigate(`/Histories/`);
        } else {
          navigate(`/MaxWeightHistories/`);
        }
      }}
      className='bg-sky-100 flex justify-center items-center h-[240px] rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 mt-4'
    >
      <div>
        <p className='text-3xl'>{name}</p>
      </div>
    </li >
  );
}
