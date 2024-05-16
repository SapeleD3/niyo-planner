import { IUser } from './interface';

export type RegisterUserResponse = {
  userId: string;
};

export type AuthenticatedUser = {
  token: string;
  user: Partial<IUser>;
};
