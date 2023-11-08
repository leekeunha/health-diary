import React, { useState } from 'react';
import SportSetCard from './SportSetCard';
import Button from './ui/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useBodyPartContext } from '../context/BodyPartContext';
import { useAuthContext } from '../context/AuthContext';
import { v4 as uuid } from 'uuid';
import { addBodyPart } from '../api/firebase';
import { addSport } from '../api/firebase';
import { saveExerciseHistory } from '../api/firebase';
import { saveExerciseSets } from '../api/firebase';
import { format } from 'date-fns';

export default function SportSets({ filtered }) {
  const [date, setDate] = useState(new Date());
  const { selectedBodyPart } = useBodyPartContext();
  const { uid } = useAuthContext();

  const handleClick = async (e) => {
    e.preventDefault();

    let filtered = [{ "id": "4d83a57e-7903-4007-8963-84fc0874c261", "name": "인클라인 벤치 프레스", "checked": true, "sets": [{ "weight": 50, "count": 10 }, { "weight": 80, "count": 8 }, { "weight": 100, "count": 6 }] }, { "id": "84c94951-90f2-411e-aea6-432bb256bf10", "name": "디클라인 벤치 프레스", "checked": true, "sets": [{ "weight": 110, "count": 11 }, { "weight": 120, "count": 9 }, { "weight": 130, "count": 7 }] }];

    const exerciseDateFormatted = format(date, 'yyyyMMddHH');
    await saveExerciseSets(
      uid,
      exerciseDateFormatted,
      selectedBodyPart.id,
      filtered
    );
  };

  return (
    <>
      <div className='mt-3 flex items-center justify-end space-x-2'>
        <label htmlFor="datetime">운동한 날짜:</label>
        <DatePicker
          selected={date}
          onChange={date => setDate(date)}
          dateFormat="yyyy/MM/dd HH:mm"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="시간"
          className='h-[40px]'
          wrapperClassName="date-picker"
        />
        <Button text={'저장'} onClick={handleClick} />
      </div>
      <ul className='mt-10 flex flex-col'>
        {filtered &&
          filtered.map((sport) => (
            <SportSetCard key={sport.id} sport={sport} />
          ))}
      </ul>
    </>
  );
}
