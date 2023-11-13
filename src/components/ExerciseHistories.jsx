import React, { useState, useEffect } from 'react';
import ExerciseHistoryCard from './ExerciseHistoryCard';
import useExerciseHistories from '../hooks/useExerciseHistories';
import { useAuthContext } from '../context/AuthContext';
import { getExerciseHistories } from '../api/firebase';
import { getBodyPartById } from '../api/firebase';

export default function ExerciseHistories() {
  const { uid } = useAuthContext();
  const [exerciseHistories, setExerciseHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getExerciseHistories(uid)
      .then(data => {
        console.log('exercise Histories : ', JSON.stringify(data));
        setExerciseHistories(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [uid]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className='mt-10 flex flex-col'>
        {exerciseHistories.map((history, index) => (
          <ExerciseHistoryCard key={index} history={history} />
        ))}
      </ul>
    </>
  );
}
