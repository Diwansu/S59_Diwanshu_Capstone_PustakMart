import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/common/ErrorBoundary';
import Notification from './components/common/Notification';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Layout>
          <Notification />
          <AppRoutes />
        </Layout>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
