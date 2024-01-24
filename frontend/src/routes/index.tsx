import React, {ReactElement, useEffect} from 'react';
import { Route, Routes as CRoutes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import Main from './Main';
import { User } from "../types/user";
import NotFound from '../components/NotFound';
import userStore from "../stores/UserStore";
import {LoginLayout} from "../layouts/LoginLayout";
import Login from "./Login";
import SignUp from "./SignUp";
import {observer} from "mobx-react-lite";


function Routes(): ReactElement {
  useEffect(() => {
    const token = localStorage.getItem('accessToken') || '';
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    userStore.setAccessToken(token);
    userStore.setProfile(user);
  }, []);
  return (
    <CRoutes>
      {userStore.accessToken ? (
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      ) : (
        <Route path="/" element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      )}
    </CRoutes>
  );
}

export default observer(Routes);
