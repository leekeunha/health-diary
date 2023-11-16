import { useQuery } from '@tanstack/react-query';
import { getMainMenus as fetchProducts } from '../api/firebase';

export default function useMainMenus() {

  const mainMenusQuery = useQuery(['mainMenus'], fetchProducts, {
    staleTime: 1000 * 60,
  });

  return { mainMenusQuery };
}
