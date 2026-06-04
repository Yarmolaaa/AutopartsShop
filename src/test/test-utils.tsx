import { type PropsWithChildren, type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rootReducer, type RootState } from '@/store/root-reducer';

/** Fresh store per test (avoids state leaking between tests). */
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as never,
    middleware: (gdm) => gdm({ serializableCheck: false }),
  });
}

export type AppStore = ReturnType<typeof setupStore>;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  route?: string;
  store?: AppStore;
}

/** Render a component inside all the app's providers (Redux + Router + React Query). */
export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    route = '/',
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter
          initialEntries={[route]}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          {children}
        </MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
