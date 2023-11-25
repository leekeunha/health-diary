import React, { useState } from 'react';
import SportSetCard from './SportSetCard';
import Button from './ui/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import { useBodyPartContext } from '../context/BodyPartContext';
import { useAuthContext } from '../context/AuthContext';
import { saveExerciseSets } from '../api/firebase';
import { format } from 'date-fns';
import { useForm, FormProvider } from 'react-hook-form';
import ConfirmationModal from './ui/ConfimationModal';

export default function SportSets({ filtered, bodyPart }) {
  const [date, setDate] = useState(new Date());
  //const { selectedBodyPart } = useBodyPartContext();
  const { uid } = useAuthContext();
  const methods = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setCounts, setSetCounts] = useState({});
  const updateSetCount = (sportId, count) => {
    setSetCounts(prevCounts => ({
      ...prevCounts,
      [sportId]: count
    }));
  };

  const handleClick = async (e) => {
    //e.preventDefault();
    // await addSport('8b0c3d0f-871a-41fa-a245-a8ef6bd460b9', '데드리프트');
    // await addSport('8b0c3d0f-871a-41fa-a245-a8ef6bd460b9', '랫풀다운');
    // await addSport('8b0c3d0f-871a-41fa-a245-a8ef6bd460b9', '로우풀');
    // await addSport('8b0c3d0f-871a-41fa-a245-a8ef6bd460b9', '바벨로우');
    // await addSport('8b0c3d0f-871a-41fa-a245-a8ef6bd460b9', '덤벨로우');
    const formData = methods.getValues();
    const exerciseDateFormatted = format(date, 'yyyyMMddHH');
    let filteredFormData = {};

    for (const sportId in formData) {
      const sportData = formData[sportId];
      const selectedSetCount = setCounts[sportId] || 3; // 선택된 세트 수, 기본값 3

      // 선택된 세트 수에 맞게 데이터 필터링
      let setsData = [];
      for (let i = 0; i < selectedSetCount; i++) {
        if (sportData.sets[i]) {
          setsData.push(sportData.sets[i]);
        }
      }

      filteredFormData[sportId] = {
        ...sportData,
        sets: setsData
      };
    }

    try {
      // 서버에 filteredFormData를 사용하여 저장
      await saveExerciseSets(uid, exerciseDateFormatted, bodyPart.id, filteredFormData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('저장 중 에러가 발생했습니다:', error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleClick)}>
          <div className='mt-3 flex items-center justify-end space-x-2 mr-2'>
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
                <SportSetCard
                  key={sport.id}
                  sport={sport}
                  setCount={setCounts[sport.id] || 3} // Default to 3 if not set
                  updateSetCount={updateSetCount}
                />
              ))}
          </ul>
        </form>
      </FormProvider>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="저장되었습니다."
      />
    </>
  );
}
