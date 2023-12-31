import React, { useEffect, useState } from 'react';
import HistoryDetailCard from './HistoryDetailCard'
import { useAuthContext } from '../context/AuthContext';
import useHistoryDetails from '../hooks/useHistoryDetails';

export default function HistoryDetails({ date }) {
  const { uid } = useAuthContext();
  const [historyDetails, setHistoryDetails] = useState(null);

  const {
    historyDetailsQuery: { isLoading, error, data },
  } = useHistoryDetails(uid, date);

  useEffect(() => {
    if (uid) {
      setHistoryDetails(data);
    }
  }, [uid, date, data]);

  if (!uid) {
    return <p>Loading user data...</p>;
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className='mt-2 text-2xl font-medium bg-green-500 text-white rounded px-2 py-2 border-blue-700 mr-2 text-center'>{getFormattedDateWithWeekday(date)}</div>
      <ul className='mt-8 flex flex-col'>
        {historyDetails &&
          historyDetails.map((historyDetail) => (
            <HistoryDetailCard key={historyDetail.id} historyDetail={historyDetail} />
          ))}
      </ul>
    </>
  );
}

function getFormattedDateWithWeekday(dateStr) {
  let year = dateStr.substring(0, 4);
  let month = dateStr.substring(4, 6);
  let day = dateStr.substring(6, 8);
  let hour = dateStr.substring(8, 10);
  let date = new Date(year, month - 1, day, hour);
  let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'long' };

  return date.toLocaleString('ko-KR', options);
}