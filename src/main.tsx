import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { store } from '@/store';
import { setupMockApi } from '@/api/mock';
import './index.css';

// Wire up the in-memory fake backend (section 3.4).
// Remove this single line to talk to a real server instead.
setupMockApi();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HashRouter
              future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <App />
        </HashRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
