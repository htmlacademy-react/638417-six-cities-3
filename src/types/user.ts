import { TUser } from './offers';

export type TUserData = TUser & {
  email: string;
  token: string;
}

export type TUserAuthData = {
  login: string;
  password: string;
};
