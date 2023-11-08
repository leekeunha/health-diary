import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMainMenus as fetchProducts, addNewProduct } from '../api/firebase';

export default function useMainMenus() {
  const queryClient = useQueryClient();

  const mainMenusQuery = useQuery(['mainMenus'], fetchProducts, {
    staleTime: 1000 * 60,
  });

  // const addProduct = useMutation(
  //   ({ product, url }) => addNewProduct(product, url),
  //   {
  //     onSuccess: () => queryClient.invalidateQueries(['mainMenus']),
  //   }
  // );

  return { mainMenusQuery };
  // return { productsQuery, addProduct };
}
