import React, { useEffect, useState } from 'react';
import SportCard from './SportCard';
import useSports from '../hooks/useSports';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
//import { useBodyPartContext } from '../context/BodyPartContext';
import AddTodo from './AddTodo';
import { deleteSport } from '../api/firebase';
export default function Sports({ bodyPart }) {

  const navigate = useNavigate();
  // const { selectedBodyPart } = useBodyPartContext();
  // console.log({ selectedBodyPart });
  const {
    sportsQuery: { isLoading, error, data: fetchedSports },
  } = useSports(bodyPart.id);

  const [sports, setSports] = useState([]);

  useEffect(() => {
    if (fetchedSports) {
      const sportsWithChecked = fetchedSports.map(sport => ({
        ...sport,
        checked: false,
      }));
      setSports(sportsWithChecked);
    }

    //console.log('sports', sports);
  }, [fetchedSports]);

  const handleUpdate = (updated) => {
    setSports(sports.map((s) => (s.id === updated.id ? updated : s)));
  }

  const handleDelete = async (sport) => {
    await deleteSport(bodyPart.id, sport.id);
    setSports(sports.filter(s => s.id !== sport.id));
  };

  const handleAdd = (sport) => setSports([...sports, sport]);

  useEffect(() => {
    //console.log('Updated sports state:', sports);
  }, [sports]);

  const filtered = getFilteredItems(sports, true);

  const hasSelectedItems = filtered.length > 0;

  const handleClick = (e) => {
    if (hasSelectedItems) {
      navigate('/sets', { state: { filtered, bodyPart } });
    }
  };


  function renderSelectedItems(selectedItems) {
    if (selectedItems.length === 0) {
      return <span className="text-2xl">없음</span>;
    }

    const itemsText = selectedItems.map((item) => item.name).join(", ");
    return <span className="text-2xl">{itemsText}</span>;
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p className='text-3xl text-center pt-3'>오늘 운동 한 종목을 선택해 주세요.</p>
      <div className='flex justify-between border-b border-gray-300 p-2 mt-10 ml-3'>
        <div><span className='text-2xl text-center mr-3'>선택한 종목 : </span>
          {renderSelectedItems(filtered)}
        </div>
        <Button text='선택 완료' className={'text-xl m-1 w-[150px] h-[3rem]'} onClick={handleClick} disabled={!hasSelectedItems} />
      </div>
      <ul className='mt-10 flex flex-col'>
        {sports &&
          sports.map((sport) => (
            <SportCard key={sport.id} sport={sport} onUpdate={handleUpdate} onDelete={handleDelete} />
          ))}
      </ul >

      <AddTodo bodyPart={bodyPart} onAdd={handleAdd}></AddTodo>

    </>
  );
}

function getFilteredItems(sports, filter) {
  return sports.filter((sport) => sport.checked === filter);
}
