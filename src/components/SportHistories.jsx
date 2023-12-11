import React from 'react';
import SportHistoryCard from './SportHistoryCard';
import useSportHistories from '../hooks/useSportHistories';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

export default function SportHistories({ sport }) {
  const {
    sportHistoriesQuery: { isLoading, error, data: sportHistories },
  } = useSportHistories(sport);

  console.log('sportHistories: ', JSON.stringify(sportHistories));

  // 날짜 포맷을 변경하는 함수 (YYYYMMDDHH 형식을 JS Date 객체로 변환)
  const formatSportHistories = (histories) => {
    return histories.map((history) => ({
      ...history,
      date: moment(history.date, 'YYYYMMDDHH').toDate(),
    }));
  };

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
      {sportHistories && (
        <div className="w-full">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={formatSportHistories(sportHistories)}
              margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(tick) => moment(tick).format('MM/DD HH:mm')} />
              <YAxis />
              <Tooltip labelFormatter={(label) => moment(label).format('YYYY-MM-DD HH:mm')} />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#8884d8" />
              <Line type="monotone" dataKey="reps" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
