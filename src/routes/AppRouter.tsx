import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingPage from '@/pages/LoadingPage/LoadingPage';

const SearchPage = lazy(() => import('@/pages/SearchPage/SearchPage'));

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={`/:category/:id`}
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <SearchPage />
                        </Suspense>
                    }
                />
                <Route
                    index
                    path="*"
                    element={
                        <Suspense fallback={<LoadingPage />}>
                            <SearchPage />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
