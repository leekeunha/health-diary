import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts as fetchProducts, addNewProduct, getBodyParts as fetchBodyParts } from '../api/firebase';

export default function useBodyParts() {

  const bodyPartsQuery = useQuery(['bodyParts'], fetchBodyParts, {
    staleTime: 1000 * 60,
  });

  return { bodyPartsQuery };
}
