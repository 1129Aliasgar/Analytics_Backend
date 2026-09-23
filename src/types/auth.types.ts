export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LogoutUserInput {
  token: string;
}

export interface ProfileUserInput {
  userId: string;
  token: string;
}