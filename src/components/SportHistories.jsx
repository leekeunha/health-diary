import React from 'react';
import SportHistoryCard from './SportHistoryCard';
import useSportHistories from '../hooks/useSportHistories';

export default function SportHistories({ sport }) {
  const { sportHistoriesQuery: { isLoading, error, data: sportHistories } } = useSportHistories(sport);


  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <div className='text-3xl text-center mt-10'>{sport.name}</div>
      <ul className='mt-10 flex flex-col'>
        {sportHistories &&
          sportHistories.map((sportHistory) => (
            <SportHistoryCard key={sportHistory.id} sportHistory={sportHistory} />
          ))}
      </ul>
    </>
  );
}
