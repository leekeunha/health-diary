import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SportCard({
  sport,
  sport: { id, name, checked },
  onUpdate
}) {
  // const navigate = useNavigate();
  const handleChange = (e) => {
    const checked = e.target.checked ? true : false;

    onUpdate({ ...sport, checked })
    //console.log('{ ...sport, checked }', { ...sport, checked });
  }
  return (
    <li
      className='flex justify-center items-center h-24 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 m-3'
    >
      <input
        type='checkbox'
        className='w-[2rem] h-[2rem] m-10'
        checked={checked === true}
        onChange={handleChange}
        id={id}
      />
      <label htmlFor={id} className="w-full h-full flex justify-center items-center text-2xl">
        {name}
      </label>
      {checked}
    </li>
  );
}

