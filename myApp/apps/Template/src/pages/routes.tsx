import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@/business/home/index.tsx'));
const DetailPage = lazy(() => import('@/business/detail/index'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/detail/:id',
    element: <DetailPage />,
  },
];
