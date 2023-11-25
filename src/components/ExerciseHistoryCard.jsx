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
      //console.log({ history });
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

      console.log({ parts });
      console.log({ sportsByBodyPart });
      console.log(history.date);
      let dateForRedirect = getDateForRedirect(history.date);
      setDate(dateForRedirect);
      setBodyParts(parts);
      setSports(sportsByBodyPart);
    };

    fetchDetails();
  }, [history]);

  function test() {
    //console.log('date: ', date);
    //debugger;
    navigate(`/historyDetails`, { state: { date } });
  }

  return (
    <div
      className='bg-sky-100 h-auto rounded-lg shadow-md overflow-hidden mb-4 p-4'
      onClick={() => test()}
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
  const weekday = date.toLocaleString('ko-KR', { weekday: 'long' }); // Adjust 'en-US' to your locale if needed
  return `${year}.${month}.${day}.${time} ${weekday}`;
}

function getDateForRedirect(dateStr) {
  // 먼저 문자열에서 점(.)과 콜론(:)을 제거합니다.
  let formattedString = dateStr.replace(/[.:]/g, '');

  // 그 후 연도, 월, 일, 그리고 시간 부분(첫 두 자리)만 추출합니다.
  formattedString = formattedString.substring(0, 10); // '2023112217' 형태 추출

  return formattedString;
}
