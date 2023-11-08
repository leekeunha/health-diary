import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';
import { BodyPartContextProvider } from './context/BodyPartContext';
import Navbar from './components/Navbar';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BodyPartContextProvider>
          <Navbar />
          <Outlet />
        </BodyPartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
