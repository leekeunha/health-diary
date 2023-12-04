import { useQuery } from '@tanstack/react-query';
import { getExerciseHistories as fetchExerciseHistories } from '../api/firebase';

export default function useExerciseHistories() {
  const exerciseHistoryQuery = useQuery(['exerciseHistory'], fetchExerciseHistories, {
    staleTime: 1000 * 60,
  });
  return { exerciseHistoryQuery };
}
