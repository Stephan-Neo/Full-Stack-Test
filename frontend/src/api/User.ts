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
