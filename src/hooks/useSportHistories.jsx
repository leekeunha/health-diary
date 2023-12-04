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
      staleTime: 1000 * 60,
      enabled: !!uid && !!sportId
    }
  );

  return { sportHistoriesQuery };
}
