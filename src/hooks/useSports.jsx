import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSports as fetchSports } from '../api/firebase';

export default function useSports(id) {

  const sportsQuery = useQuery(['sports', id || ''], () => fetchSports(id), {
    staleTime: 1000 * 60,
  });
  return { sportsQuery };
}
