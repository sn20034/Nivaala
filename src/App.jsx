import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import AppRoutes from '@/routes/AppRoutes';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3500,
                style: {
                  borderRadius: '16px',
                  background: '#FFF8EE',
                  color: '#1A1210',
                  border: '1px solid #E8D9C3',
                  fontWeight: 500,
                },
              }}
            />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
