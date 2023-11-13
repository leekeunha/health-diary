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
          parts.push(bodyPart); // Add the fetched body part to the array
          const sportIds = history[bodyPartId];
          const sports = await Promise.all(
            sportIds.map(sportId => getExerciseNameById(bodyPartId, sportId))
          );
          setSports(sports); // You might want to handle sports update differently
        }
      }
      setBodyParts(parts); // Update the state with the collected parts
    };
    console.log({ bodyParts });

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
          <p className='text-lg font-medium'>{part[1]}</p>

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