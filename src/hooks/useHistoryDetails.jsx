import { useQuery } from '@tanstack/react-query';
import { getfetchHistoryDetails as fetchHistoryDetails } from '../api/firebase';

export default function useHistoryDetails(userId, date) {
  // const queryClient = useQueryClient();
  //debugger;
  const historyDetailsQuery = useQuery(['historyDetails'], () => fetchHistoryDetails(userId, date), {
    //staleTime: 1000 * 60,
  });

  // const addProduct = useMutation(
  //   ({ product, url }) => addNewProduct(product, url),
  //   {
  //     onSuccess: () => queryClient.invalidateQueries(['products']),
  //   }
  // );

  return { historyDetailsQuery };
}
