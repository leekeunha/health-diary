import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';
import { BodyPartContextProvider } from './context/BodyPartContext';
import Navbar from './components/Navbar';
import { SportContextProvider } from './context/SportContext';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BodyPartContextProvider>
          <SportContextProvider>
            <Navbar />
            <Outlet />
          </SportContextProvider>
        </BodyPartContextProvider>

      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
