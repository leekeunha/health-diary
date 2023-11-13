import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBodyPartContext } from '../context/BodyPartContext';
import { getBodyPartById, getExerciseNameById } from '../api/firebase';

export default function ExerciseHistoryCard({
  history,
}) {
  const navigate = useNavigate();
  const [bodyParts, setBodyParts] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      let parts = [];
      for (const bodyPartId in history) {
        if (bodyPartId !== 'date') {
          const bodyPart = await getBodyPartById(bodyPartId);
          let bodyPartName = bodyPart[1];
          console.log({ bodyPartName });
          const sportIds = history[bodyPartId];
          console.log({ sportIds });
          const sports = await Promise.all(sportIds.map(sportId => getExerciseNameById(bodyPartId, sportId)));
          setSports(sports);
          console.log({ sports });
        }
      }
      setBodyParts(parts);
    };

    fetchDetails();
  }, [history]);

  return (
    <li
      onClick={() => navigate(`/historyDetail`)}
      className='flex flex-col justify-center items-center h-auto rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 mb-4 p-4'
    >
      <div className='text-center mb-2'>
        <p className='text-xl font-bold'>{history.date}</p>
      </div>
      {bodyParts.map((part, index) => (
        <div key={index} className='text-center'>
          <p className='text-lg font-medium'>{part}</p>

        </div>
      ))}
      <ul>
        {sports.map((name, index) => (
          <li key={index}>{name[1]}</li>
        ))}
      </ul>
    </li>
  );
}