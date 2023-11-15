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
      //console.log({ history });
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

    fetchDetails();
  }, [history]);



  return (
    <div
      className='bg-sky-100 h-auto rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 mb-4 p-4'
    // onClick={() => navigate(`/historyDetail`)}

    >
      <div className='flex justify-between'>
        <span className='text-xl font-bold'>
          {getFormattedDateWithWeekday(history.date)}
        </span>
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
          <span className='font-bold text-blue-600'>{bodyPart[1]}</span> :
          {sports[bodyPart[0]].map((sport, idx, arr) => (
            <span key={idx}>
              {sport[1]}{idx < arr.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}


function getFormattedDateWithWeekday(dateStr) {
  const [year, month, day, time] = dateStr.split('.');
  const date = new Date(`${year}-${month}-${day}`);
  const weekday = date.toLocaleString('ko-KR', { weekday: 'long' }); // Adjust 'en-US' to your locale if needed
  return `${year}.${month}.${day}.${time} ${weekday}`;
}