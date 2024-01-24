import React, {ReactElement, useEffect} from 'react';
import {Route, Routes as CRoutes, useNavigate} from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import Main from './Main';
import NotFound from '../components/NotFound';
import userStore from "../stores/UserStore";
import {LoginLayout} from "../layouts/LoginLayout";
import Login from "./Login";
import SignUp from "./SignUp";
import {observer} from "mobx-react-lite";
import Profile from "./Profile";


function Routes(): ReactElement {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('accessToken') || '';
    const userId = localStorage.getItem('userId') || '';
    userStore.setAccessToken(token);
    userStore.setUserId(userId);
    if (!token) {
      navigate('/login')
    }
  }, [userStore.accessToken]);
  return (
    <CRoutes>
      {userStore.accessToken ? (
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
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
