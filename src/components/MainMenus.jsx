import React from 'react';
import MainMenuCard from './MainMenuCard';
import useMainMenus from '../hooks/useMainMenus';

export default function MainMenus() {
  const {
    mainMenusQuery: { data: mainMenus },
  } = useMainMenus();

  return (
    <>
      <ul className='mt-10 flex flex-col'>
        {mainMenus &&
          mainMenus.map((mainMenu) => (
            <MainMenuCard key={mainMenu.id} mainMenu={mainMenu} />
          ))}
      </ul>
    </>
  );
}
