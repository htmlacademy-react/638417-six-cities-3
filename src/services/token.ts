const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export type Token = string;

const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=';
const saveToken = (token: Token): void => localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
const dropToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY_NAME);

export {getToken, saveToken, dropToken};
