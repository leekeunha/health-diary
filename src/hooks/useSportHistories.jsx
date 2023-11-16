import { useQuery } from '@tanstack/react-query';
import { getSportHistories as fetchSportHistories } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useSportHistories(sport) {
  const { uid } = useAuthContext();

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
