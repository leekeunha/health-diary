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
  const [filter, setFilter] = useState('all');
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

  const currentFilteredHistories = filter === 'all'
    ? exerciseHistories
    : exerciseHistories.filter(history => history.hasOwnProperty(filter));

  const currentItems = currentFilteredHistories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleFilterChange = newFilter => {
    setFilter(newFilter);
    setCurrentPage(0);
  };

  return (
    <>
      <div className='flex justify-center my-4'>
        <button onClick={() => handleFilterChange('all')} className={`mx-2 px-4 py-2 border rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          전체
        </button>
        <button onClick={() => handleFilterChange(CHEST)} className={`mx-2 px-4 py-2 border rounded ${filter === '231670b4-257c-4eca-9823-31093180dc35' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          가슴
        </button>
        <button onClick={() => handleFilterChange(BACK)} className={`mx-2 px-4 py-2 border rounded ${filter === '8b0c3d0f-871a-41fa-a245-a8ef6bd460b9' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          등
        </button>
        <button onClick={() => handleFilterChange(SHOULDER)} className={`mx-2 px-4 py-2 border rounded ${filter === '880d8809-9bb4-4c70-b51f-8c85be2d2097' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          어깨
        </button>
        <button onClick={() => handleFilterChange(ARM)} className={`mx-2 px-4 py-2 border rounded ${filter === '91a226f7-e93f-4a40-9349-2c23db212d32' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          팔
        </button>
        <button onClick={() => handleFilterChange(LEG)} className={`mx-2 px-4 py-2 border rounded ${filter === '08710185-8618-4f40-9f8a-5350bb0f0553' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          다리
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className='mt-10 flex flex-col'>
        {currentItems.map((history, index) => (
          <ExerciseHistoryCard key={index} history={history} />
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <div className='flex justify-center flex-grow'>
          {Array.from({ length: Math.ceil(currentFilteredHistories.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i)}
              className={`mx-1 px-3 py-1 border rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-700">
          Showing {currentItems.length} out of {currentFilteredHistories.length} entries
        </div>
      </div>
    </>
  );
}

export const CHEST = '231670b4-257c-4eca-9823-31093180dc35';
export const BACK = '8b0c3d0f-871a-41fa-a245-a8ef6bd460b9';
export const SHOULDER = '880d8809-9bb4-4c70-b51f-8c85be2d2097';
export const ARM = '91a226f7-e93f-4a40-9349-2c23db212d32';
export const LEG = '08710185-8618-4f40-9f8a-5350bb0f0553';
