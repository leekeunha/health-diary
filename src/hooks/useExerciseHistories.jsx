import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getExerciseHistories as fetchExerciseHistories } from '../api/firebase';
// import { getProducts as fetchProducts, addNewProduct } from '../api/firebase';

export default function useExerciseHistories() {
  const queryClient = useQueryClient();

  const exerciseHistoryQuery = useQuery(['exerciseHistory'], fetchExerciseHistories, {
    staleTime: 1000 * 60,
  });

  // const addProduct = useMutation(
  //   ({ product, url }) => addNewProduct(product, url),
  //   {
  //     onSuccess: () => queryClient.invalidateQueries(['products']),
  //   }
  // );

  return { exerciseHistoryQuery };
}
