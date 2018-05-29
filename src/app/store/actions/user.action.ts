import { Action } from "@ngrx/store";

export enum Types {
  GET_USER = "[Auth] Get user",
  AUTHENTICATED = "[Auth] Authenticated",
  NOT_AUTHENTICATED = "[Auth] Not authenticated",
  GOOGLE_LOGIN = "[Auth] Google login",
  LOGOUT = "[Auth] Logout",
  AUTH_ERROR = "[Auth] Error"
}

export class GetUser implements Action {
  readonly type = Types.GET_USER;
  constructor() {}
}

export class Authenticated implements Action {
  readonly type = Types.AUTHENTICATED;
  constructor(public payload: any) {}
}

export class NotAuthenticated implements Action {
  readonly type = Types.NOT_AUTHENTICATED;
  constructor() {}
}

export class GoogleLogin implements Action {
  readonly type = Types.GOOGLE_LOGIN;
  constructor() {}
}

export class Logout implements Action {
  readonly type = Types.LOGOUT;
  constructor() {}
}

export class AuthError implements Action {
  readonly type = Types.AUTH_ERROR;
  constructor(public payload: any) {}
}

export type Actions =
  | GetUser
  | Authenticated
  | NotAuthenticated
  | GoogleLogin
  | Logout
  | AuthError;
