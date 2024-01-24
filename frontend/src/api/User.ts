// Helpers
import axios from 'axios';

// types
import {LoginUser, SignUpUser, User} from "../types/user";

export const loginUser = async (email: string, password: string): Promise<LoginUser> => {
  const res = await axios.post<LoginUser>('api/auth/login', {
    email,
    password,
  });
  return res.data;
};

export const signUpUser = async (email: string, login: string, password: string): Promise<SignUpUser> => {
  const res = await axios.post<SignUpUser>('api/auth/signup', {
    email,
    login,
    password,
  });
  return res.data;
};

export const getUser = async (userId: string): Promise<User> => {
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  };
  const res = await axios.get<User>(`api/users/${userId}`, {
    headers
  });
  return res.data;
};
