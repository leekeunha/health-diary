import React from 'react';
import Banner from '../components/Banner';
import MainMenus from '../components/MainMenus';
import { useAuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function Home() {
  const { user, login } = useAuthContext();
  return (
    <>
      <Banner></Banner>
      {!user && <Button className={'w-full flex justify-center items-center h-[240px] rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105 mt-4 text-5xl'} text={'Login'} onClick={login} />}
      {user && <MainMenus />}
    </>
  );
}
