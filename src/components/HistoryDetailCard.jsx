import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExerciseNameByChildId } from '../api/firebase';
export default function HistoryDetailCard({
  historyDetail,
  historyDetail: { id, sets },
}) {
  const [exerciseName, setExerciseName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExerciseName = async () => {
      try {
        const name = await getExerciseNameByChildId(id);
        setExerciseName(name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExerciseName();
  }, [id]);
  return (
    <li
      className='bg-sky-100 rounded-lg shadow-md overflow-hidden my-4 p-5'
    >
      <div className=''>
        <span className='text-2xl font-medium bg-blue-500 text-white rounded px-2 py-2 border-blue-700 mr-2 flex text-center'>{exerciseName}</span>
        {sets &&
          sets.map((set) => (
            <div key={set.id} className='my-2'>
              <div className='text-2xl flex'><span className='text-2xl text-pink-600'>set {set.no} :</span>
                <div className='mx-10'>중량: <span className='text-2xl text-red-600 italic'>{set.weight} kg</span></div>
                <div className=''>횟수: <span className='text-2xl text-red-600 italic '>{set.reps}</span> </div>
              </div>
            </div>
          ))
        }
      </div >
    </li >
  );
}
