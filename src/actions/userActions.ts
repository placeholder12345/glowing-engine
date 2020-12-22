export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface IUserLoginAction {
  readonly type: typeof LOGIN;
  payload: {
    id: string;
    username: string;
  };
}

export interface IUserLogoutAction {
  readonly type: typeof LOGOUT;
}

export type UserActions = IUserLoginAction | IUserLogoutAction;
