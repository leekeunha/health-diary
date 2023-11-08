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
      className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'
    >
      <div className='text-center'>
        <p>{name}</p>
      </div>
    </li>
  );
}
