import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts as fetchProducts, addNewProduct, getBodyParts as fetchBodyParts } from '../api/firebase';

export default function useBodyParts() {
  // const queryClient = useQueryClient();

  const bodyPartsQuery = useQuery(['bodyParts'], fetchBodyParts, {
    staleTime: 1000 * 60,
  });

  // const addProduct = useMutation(
  //   ({ product, url }) => addNewProduct(product, url),
  //   {
  //     onSuccess: () => queryClient.invalidateQueries(['products']),
  //   }
  // );

  return { bodyPartsQuery };
}
