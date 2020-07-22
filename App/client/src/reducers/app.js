import {
  SET_LOGIN_LOADING,
  SIGN_IN,
  SIGN_UP,
  RECONNECT,
  RESET_LAST_CONNECTION,
  LOGOUT,
} from "../actions/app";

const defaultState = {
  logged: {
    isLoading: false,
    isLogged: false,
    username: null,
  },
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOGIN_LOADING:
      const { value: isLoading } = action.payload;
      return {
        ...state,
        logged: {
          ...state.logged,
          isLoading,
        },
      };
    case SIGN_UP:
    case SIGN_IN:
      localStorage.setItem(
        "last_session",
        JSON.stringify({ ...action.payload })
      );
      return {
        ...state,
        logged: {
          isLoading: false,
          isLogged: true,
          ...action.payload,
        },
      };
    case RECONNECT:
      const { last_session } = action.payload;
      return {
        ...state,
        logged: {
          ...last_session,
          isLoading: false,
          isLogged: true,
          profilePic: last_session.profilePic,
        },
      };
    case RESET_LAST_CONNECTION:
      localStorage.setItem("last_session", JSON.stringify({ ...state.logged }));
      return state;
    case LOGOUT:
      return {
        ...state,
        logged: defaultState.logged,
      };

    default:
      return defaultState;
  }
};
