import React from 'react';
import BodyPartCard from './BodyPartCard';
import useBodyParts from '../hooks/useBodyParts';

export default function BodyParts({ text, redirectUrl }) {
  const {
    bodyPartsQuery: { isLoading, error, data: bodyParts },
  } = useBodyParts();
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <p className='text-3xl text-center pt-3'>{text}</p>
      <ul className='mt-10 flex flex-col'>
        {bodyParts &&
          bodyParts.map((bodyPart) => (
            <BodyPartCard key={bodyPart.id} bodyPart={bodyPart} redirectUrl={redirectUrl} />
          ))}
      </ul>
    </>
  );
}