import { useQuery } from '@tanstack/react-query';
import { getSportHistories as fetchSportHistories } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';

export default function useSportHistories(sport) {
  const { uid } = useAuthContext();

  // useEffect(() => {
  //   console.log('sport from useSportHistories', sport);

  //   if (sport) {
  //     console.log('sport from useSportHistories in if', sport);
  //   }
  // }, [sport]); // sport 객체의 변경을 감시

  // sport 객체와 그 id 속성이 있는지 확인
  const sportId = sport?.id;

  const sportHistoriesQuery = useQuery(
    ['sportHistories', uid, sportId],
    () => fetchSportHistories(uid, sportId),
    {
      staleTime: 1000 * 60, // 캐시된 데이터 유지 시간 (1분)
      enabled: !!uid && !!sportId // uid와 sportId가 모두 유효할 때만 쿼리 실행
    }
  );

  return { sportHistoriesQuery };
}
