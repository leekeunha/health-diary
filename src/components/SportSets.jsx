// In SportSets component
import React, { useState } from 'react';
import SportSetCard from './SportSetCard';
import Button from './ui/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useBodyPartContext } from '../context/BodyPartContext';
import { useAuthContext } from '../context/AuthContext';
import { addSport, saveExerciseSets } from '../api/firebase';
import { format } from 'date-fns';
import { useForm, FormProvider } from 'react-hook-form';

export default function SportSets({ filtered }) {
  const [date, setDate] = useState(new Date());
  const { selectedBodyPart } = useBodyPartContext();
  const { uid } = useAuthContext();
  const methods = useForm();

  const handleClick = async (e) => {
    //e.preventDefault();
    // await addSport('08710185-8618-4f40-9f8a-5350bb0f0553', '스쿼트');
    // await addSport('08710185-8618-4f40-9f8a-5350bb0f0553', '레그프레스');
    // await addSport('08710185-8618-4f40-9f8a-5350bb0f0553', '런지');
    // await addSport('08710185-8618-4f40-9f8a-5350bb0f0553', '레그 컬');
    // await addSport('08710185-8618-4f40-9f8a-5350bb0f0553', '레그 익스텐션');

    const formData = methods.getValues();
    const exerciseDateFormatted = format(date, 'yyyyMMddHH');

    await saveExerciseSets(
      uid,
      exerciseDateFormatted,
      selectedBodyPart.id,
      formData
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleClick)}>
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
          <Button text={'저장'} type="submit" />
        </div>
        <ul className='mt-10 flex flex-col'>
          {filtered &&
            filtered.map((sport) => (
              <SportSetCard key={sport.id} sport={sport} />
            ))}
        </ul>
      </form>
    </FormProvider>
  );
}
