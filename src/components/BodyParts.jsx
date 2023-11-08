import React from 'react';
import BodyPartCard from './BodyPartCard';
// import useProducts from '../hooks/useProducts';
import useBodyParts from '../hooks/useBodyParts';


export default function BodyParts() {
  const {
    bodyPartsQuery: { isLoading, error, data: bodyParts },
  } = useBodyParts();
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p className='text-3xl text-center pt-3'>오늘 운동 한 분위를 선택해 주세요.</p>
      <ul className='mt-10 flex flex-col'>
        {bodyParts &&
          bodyParts.map((bodyPart) => (
            <BodyPartCard key={bodyPart.id} bodyPart={bodyPart} />
          ))}
      </ul>
    </>
  );
}
