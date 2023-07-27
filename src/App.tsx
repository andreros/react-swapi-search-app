import './sass/_index.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import { AppRouter } from './routes/AppRouter';

const queryClient = new QueryClient();

export const App: React.FC = () => (
    <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ReactQueryDevtools />
    </QueryClientProvider>
);
