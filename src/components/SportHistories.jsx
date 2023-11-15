import React, { useEffect } from 'react';
import SportHistoryCard from './SportHistoryCard';
import useSportHistories from '../hooks/useSportHistories';
import { useAuthContext } from '../context/AuthContext';

export default function SportHistories({ sport }) {
  const { sportHistoriesQuery: { isLoading, error, data: sportHistories } } = useSportHistories(sport);

  useEffect(() => {
    if (sportHistories) {
      console.log('Sport Histories:', JSON.stringify(sportHistories));
      console.log('sport from url', sport);
    }
  }, [sportHistories]);

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
