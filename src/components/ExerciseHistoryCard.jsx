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
      let sportsByBodyPart = {};
      console.log({ history });
      for (const bodyPartId in history) {
        if (bodyPartId !== 'date') {
          const bodyPart = await getBodyPartById(bodyPartId);
          parts.push(bodyPart);
          const sportIds = history[bodyPartId];
          const sports = await Promise.all(
            sportIds.map(sportId => getExerciseNameById(bodyPartId, sportId))
          );
          sportsByBodyPart[bodyPartId] = sports;
        }
      }
      setBodyParts(parts);
      setSports(sportsByBodyPart);
    };
    console.log({ sports });
    fetchDetails();
  }, [history]);



  return (
    <div
      className='h-auto rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 mb-4 p-4'
      onClick={() => navigate(`/historyDetail`)}

    >
      <div className='flex justify-between'>
        <div className='mb-2'>
          <span className='text-xl font-bold'>{history.date}</span>
        </div>
        <div>
          {bodyParts.map((bodyPart, index) => (
            <span key={index} className=''>
              <span className='text-lg font-medium bg-blue-500 text-white rounded px-2 py-2 border-blue-700 mr-2'>{bodyPart[1]}</span>

            </span>
          ))}
        </div>
      </div>

      {bodyParts.map((bodyPart, index) => (
        <div key={index}>
          <span className='font-bold text-blue-600'>{bodyPart[1]}</span> : {sports[bodyPart[0]].map((sport, idx) => <span key={idx}>{sport[1]}, </span>)}
        </div>
      ))}
    </div>
  );
}