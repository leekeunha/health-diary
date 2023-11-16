import { useQuery } from '@tanstack/react-query';
import { getBodyParts as fetchBodyParts } from '../api/firebase';

export default function useBodyParts() {

  const bodyPartsQuery = useQuery(['bodyParts'], fetchBodyParts, {
    staleTime: 1000 * 60,
  });

  return { bodyPartsQuery };
}
