import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function SetInput({ setNumber, sportId }) {
    const { register } = useFormContext();
    const index = setNumber - 1;

    return (
        <div className="flex justify-between items-center p-4 bg-sky-100 mt-2 rounded-md">
            <label className="flex-1 mr-2">Set {setNumber}</label>
            <input
                {...register(`${sportId}.sets.${index}.weight`)}
                type="number"
                placeholder="중량"
                className="border p-2 rounded mr-2 flex-1"
            />
            <input
                {...register(`${sportId}.sets.${index}.reps`)}
                type="number"
                placeholder="횟수"
                className="border p-2 rounded flex-1"
            />
        </div>
    );
};