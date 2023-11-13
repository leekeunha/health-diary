import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function SetInput({ setNumber, sportId }) {
    const { register } = useFormContext(); // retrieve all hook methods
    const index = setNumber - 1; // 배열 인덱스로 사용하기 위해 setNumber에서 1을 뺌

    return (
        <div className="flex justify-between items-center p-4 bg-sky-100 mt-2 rounded-md">
            <label className="flex-1 mr-2">Set {setNumber}</label>
            <input
                {...register(`${sportId}.sets.${index}.weight`)} // 배열 인덱스에 맞게 수정
                type="number"
                placeholder="중량"
                className="border p-2 rounded mr-2 flex-1"
            />
            <input
                {...register(`${sportId}.sets.${index}.reps`)} // 배열 인덱스에 맞게 수정
                type="number"
                placeholder="횟수"
                className="border p-2 rounded flex-1"
            />
        </div>
    );
};