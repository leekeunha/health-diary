import { useQuery } from '@tanstack/react-query';
import { getfetchHistoryDetails as fetchHistoryDetails } from '../api/firebase';

export default function useHistoryDetails(userId, date) {
  const historyDetailsQuery = useQuery(['historyDetails'], () => fetchHistoryDetails(userId, date), {
  });
  return { historyDetailsQuery };
}
