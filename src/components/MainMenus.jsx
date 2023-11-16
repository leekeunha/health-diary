import React from 'react';
import MainMenuCard from './MainMenuCard';
// import useProducts from '../hooks/useProducts';
import useMainMenus from '../hooks/useMainMenus';

export default function MainMenus() {

  const {
    mainMenusQuery: { data: mainMenus },
  } = useMainMenus();

  //const menus = [{ "id": 0, "name": "운동 일지 등록" }, { "id": 1, "name": "운동 일지 열람" }, { "id": 3, "name": "종목별 최고 중량 및 횟수 열람" }];

  //console.log(JSON.stringify(menus));
  return (
    <>
      {/* {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>} */}
      <ul className='mt-10 flex flex-col'>
        {mainMenus &&
          mainMenus.map((mainMenu) => (
            <MainMenuCard key={mainMenu.id} mainMenu={mainMenu} />
          ))}
      </ul>
    </>
  );
}
