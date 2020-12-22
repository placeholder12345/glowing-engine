import { LOGIN, LOGOUT, UserActions } from '../actions/userActions';

type UserState = {
  id: string;
  username: string;
  isLoggedIn: boolean;
};

const initialUserState: UserState = {
  id: '',
  username: '',
  isLoggedIn: false,
};

function userReducer(state: UserState = initialUserState, action: UserActions): UserState {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

export default userReducer;
