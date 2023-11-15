import React, { useState, useEffect } from 'react';
import { useSport } from '../context/SportContext';

export default function SportHistoryCard({
  sportHistory,
}) {
  return (
    <div
      className='bg-sky-100 h-auto rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 mb-4 p-4 bg-sky-100'
    >
      <div className='flex justify-end'>
        <span className='text-lg font-medium bg-green-500 text-white rounded px-2 py-2 border-blue-700 mr-2'>
          {sportHistory.date}</span>


      </div>
      <div className='flex text-xl ml-20 '>
        <span className='text-bold w-1/6 text-center'>최대 중량</span>
        <span className='ml-20 mr-20'></span>
        <span className='text-lg ml-5 font-medium px-2 py-2 mr-2 w-1/6 text-center'>횟수</span>
      </div>
      <div className='flex text-xl mt-4 ml-20'>
        <span className='text-lg font-medium bg-blue-500 text-white rounded px-2 py-2 border-blue-700 mr-2 w-1/6 text-center'>{sportHistory.reps}KG</span>
        <span className='ml-20 mr-20'>*</span>
        <span className='text-lg font-medium bg-blue-500 text-white rounded px-2 py-2 border-blue-700 mr-2 w-1/6 text-center'>{sportHistory.weight}회</span>
      </div>

    </div>
  );
}