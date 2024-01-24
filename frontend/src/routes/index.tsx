import React, { ReactElement } from 'react';
import { Route, Routes as CRoutes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import Main from './Main';
import NotFound from '../components/NotFound';

function Routes(): ReactElement {
  return (
    <CRoutes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </CRoutes>
  );
}

export default Routes;
