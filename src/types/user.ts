import { TUser } from './offers';

export type TUserData = TUser & {
  email: string;
  token: string;
}

export type TUserAuthData = {
  email: string;
  password: string;
};

export type TValidationDetail = {
  property: string;
  value: string;
  messages: string[];
};

export type TValidationErrorResponse = {
  errorType: 'VALIDATION_ERROR';
  message: string;
  details: TValidationDetail[];
};
