import { TUser } from './offers';

export type TUserAuthData = {
  email: string;
  password: string;
};

export type TUserData = TUser & {
  email: string;
  token: string;
}
