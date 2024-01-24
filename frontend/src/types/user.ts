export interface User {
  id: string,
  email: string,
  "login": string
}

export interface LoginUser {
  userId: string,
  accessToken: string,
  accessTokenExpires: string,
  id: string,
  createdAt: string,
  updatedAt: string
}

export interface SignUpUser {
  id: string,
  email: string,
  login: string
}
