import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBodyPartById, getExerciseNameByIds } from '../api/firebase';

export default function ExerciseHistoryCard({
  history,
}) {
  const navigate = useNavigate();
  const [bodyParts, setBodyParts] = useState([]);
  const [sports, setSports] = useState([]);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      let parts = [];
      let sportsByBodyPart = {};

      for (const bodyPartId in history) {
        if (bodyPartId !== 'date') {
          const bodyPart = await getBodyPartById(bodyPartId);
          parts.push(bodyPart);
          const sportIds = history[bodyPartId];
          const sports = await Promise.all(
            sportIds.map(sportId => getExerciseNameByIds(bodyPartId, sportId))
          );
          sportsByBodyPart[bodyPartId] = sports;
        }
      }

      let dateForRedirect = getDateForRedirect(history.date);
      setDate(dateForRedirect);
      setBodyParts(parts);
      setSports(sportsByBodyPart);
    };

    fetchDetails();
  }, [history]);

  function NavagateToHistoryDeatil() {
    navigate(`/historyDetails`, { state: { date } });
  }

  return (
    <div
      className='bg-sky-100 h-auto rounded-lg shadow-md overflow-hidden mb-4 p-4 cursor-pointer'
      onClick={() => NavagateToHistoryDeatil()}
    >
      <div className='flex justify-between'>
        <span className='text-xl font-bold bg-green-500 text-white rounded px-2 py-2 my-2'>
          {getFormattedDateWithWeekday(history.date)}
        </span>
        <div>
          {bodyParts.map((bodyPart, index) => (
            <span key={index}>
              <span className='text-lg font-medium bg-blue-500 text-white rounded px-2 py-2 border-blue-700 mr-2'>{bodyPart[1]}</span>
            </span>
          ))}
        </div>
      </div>

      {bodyParts.map((bodyPart, index) => (
        <div key={index}>
          <span className='font-bold text-blue-600 ml-2'>{bodyPart[1]}</span>:
          {sports[bodyPart[0]].map((sport, idx, arr) => (
            <span className='ml-1' key={idx}>
              {sport[1]}{idx < arr.length - 1 ? ',' : ''}
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
  const weekday = date.toLocaleString('ko-KR', { weekday: 'long' });
  return `${year}.${month}.${day}.${time} ${weekday}`;
}

function getDateForRedirect(dateStr) {

  let formattedString = dateStr.replace(/[.:]/g, '');
  formattedString = formattedString.substring(0, 10);

  return formattedString;
}
