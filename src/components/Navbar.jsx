import React from 'react';
import { Link } from 'react-router-dom';
import { GiMuscleUp } from 'react-icons/gi';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuthContext();
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <GiMuscleUp />
        <h1>Health Diary</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        {user && <User user={user} />}
        {/* {!user && <Button text={'Login'} onClick={login} />} */}
        {user && <Button text={'Logout'} onClick={logout} />}
      </nav>
    </header>
  );
}
