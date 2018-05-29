import * as fromUserActions from "../actions/user.action";
import { User } from "../../interfaces/user.interface";

export type Action = fromUserActions.Actions;

export interface State extends User {}

export const initialState: User = {
  uid: null,
  displayName: "Guest"
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case fromUserActions.Types.GET_USER:
      return { ...state, loading: true };

    case fromUserActions.Types.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false };

    case fromUserActions.Types.NOT_AUTHENTICATED:
      return { ...state, ...initialState, loading: false };

    case fromUserActions.Types.GOOGLE_LOGIN:
      return { ...state, loading: true };

    case fromUserActions.Types.LOGOUT:
      return { ...state, ...initialState, loading: false };

    case fromUserActions.Types.AUTH_ERROR:
      return { ...state, error: action.payload, loading: false };
  }
}
