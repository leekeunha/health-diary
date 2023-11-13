import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBodyPartContext } from '../context/BodyPartContext';

export default function BodyPartCard({
  bodyPart,
  bodyPart: { id, name },
}) {
  const navigate = useNavigate();
  const { setSelectedBodyPart } = useBodyPartContext();
  return (
    <li
      onClick={() => {
        setSelectedBodyPart(bodyPart);
        navigate(`/sports`);
      }}
      className='flex justify-center items-center h-[140px] rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'
    >
      <div className='text-center'>
        <p className='text-3xl'>{name}</p>
      </div>
    </li>
  );
}
