import React, { useEffect, useState } from 'react';
import SportCard from './SportCard';

// import useProducts from '../hooks/useProducts';
//import useBodyParts from '../hooks/useBodyParts';
import useSports from '../hooks/useSports';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useBodyPartContext } from '../context/BodyPartContext';
export default function Sports() {
  //const { id } = useParams();
  const navigate = useNavigate();
  const { selectedBodyPart } = useBodyPartContext();
  const {
    sportsQuery: { isLoading, error, data: fetchedSports },
  } = useSports(selectedBodyPart.id);

  const [sports, setSports] = useState([]);

  useEffect(() => {
    if (fetchedSports) {
      const sportsWithChecked = fetchedSports.map(sport => ({
        ...sport,
        checked: false,
      }));
      setSports(sportsWithChecked);
    }

    console.log('sports', sports);
  }, [fetchedSports]);

  const handleUpdate = (updated) => {
    setSports(sports.map((s) => (s.id === updated.id ? updated : s)));
  }

  useEffect(() => {
    console.log('Updated sports state:', sports);
  }, [sports]);

  const handleClick = (e) => {
    navigate('/sets', { state: { filtered } });

  };

  const filtered = getFilteredItems(sports, true);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p className='text-3xl text-center pt-3'>오늘 운동 한 종목을 선택해 주세요.</p>
      <ul className='mt-10 flex flex-col'>
        {sports &&
          sports.map((sport) => (
            <SportCard key={sport.id} sport={sport} onUpdate={handleUpdate} />
          ))}
      </ul>
      <div className='flex justify-between border-b border-gray-300 p-2 mt-10 ml-3'>
        <div><span className='text-2xl text-center mr-3'>선택한 종목:</span>
          {filtered.map((item) => (
            <span className='mr-3'>{item.name}</span>
          ))}
        </div>
        <Button text='선택 완료' onClick={handleClick} />
      </div>
    </>
  );
}

function getFilteredItems(sports, filter) {
  return sports.filter((sport) => sport.checked === filter);
}
