import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBodyPartContext } from '../context/BodyPartContext';
import { getBodyPartById, getExerciseNameById } from '../api/firebase';

export default function ExerciseHistoryCard({
  history,
}) {
  const navigate = useNavigate();
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    // Assuming you have a function that gets the body parts and exercises details by ID
    const fetchDetails = async () => {
      let parts = [];
      for (const bodyPartId in history) {
        if (bodyPartId !== 'date') {
          const bodyPart = await getBodyPartById(bodyPartId);
          let bodyPartName = bodyPart[1];

          const exerciseIds = history[bodyPartId];
          console.log({ exerciseIds }); //여기 까지는 잘 나오는지 확인 했음.//bodyPartId와 exerciseId로 exerciseName의 베열을 불러오는 함수를 작성해야 돼
          const exerciseNames = await Promise.all(exerciseIds.map(id => getExerciseNameById(bodyPartId, id))); // Assuming you have such a function
          //현재 exerciseNames과 빈 배열로 들어옴.즉,getExerciseNameById가 함수 수정해야 돼!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!
          console.log({ exerciseNames });
          //parts.push({ bodyPartName, exerciseNames });
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
          <p className='text-lg font-medium'>{part.bodyPartName}</p>
          <ul>
            {part.exerciseNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      ))}
    </li>
  );
}