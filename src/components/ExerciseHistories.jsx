import React, { useState, useEffect } from 'react';
import ExerciseHistoryCard from './ExerciseHistoryCard';
import { useAuthContext } from '../context/AuthContext';
import { getExerciseHistories } from '../api/firebase';

export default function ExerciseHistories() {
  const { uid } = useAuthContext();
  const [exerciseHistories, setExerciseHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  useEffect(() => {
    setIsLoading(true);
    getExerciseHistories(uid)
      .then(data => {
        setExerciseHistories(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [uid]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = exerciseHistories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className='mt-10 flex flex-col'>
        {currentItems.map((history, index) => (
          <ExerciseHistoryCard key={index} history={history} />
        ))}
      </ul>
      <div className='flex justify-center mt-4'>
        {Array.from({ length: Math.ceil(exerciseHistories.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );

}
