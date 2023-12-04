import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './Sport.module.css';

export default function SportCard({
  sport,
  sport: { id, name, checked },
  onUpdate,
  onDelete
}) {
  const handleChange = (e) => {
    const checked = e.target.checked ? true : false;

    onUpdate({ ...sport, checked })
  }

  const handleDelete = () => onDelete(sport);

  return (
    <li
      className='bg-sky-100 flex justify-center items-center h-24 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 m-3'
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
      <span className={styles.icon}>
        <button onClick={handleDelete} className={styles.button}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
}

