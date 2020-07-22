import api from "../api/api";
import axios from "axios";
import cogoToast from "cogo-toast";
const API = new api();

export const RESET_LAST_CONNECTION = "[App] RESET_LAST_CONNECTION",
         SET_LOGIN_LOADING = "[APP] SET_LOGIN_LOADING",
         RECONNECT = "[APP] RECONNECT",
         SIGN_UP = "[APP] SIGN_UP",
         SIGN_IN = "[APP] SIGN_IN",
         LOGOUT = "[APP] LoGOUT";
 
  
  
export const setLoginLoad = (value) => {
  return (dispatch) =>
    dispatch({
      type: SET_LOGIN_LOADING,
      payload: {
        value,
      },
    });
};



export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("last_session");
    dispatch(setLoginLoad(true));
    dispatch({
      type: LOGOUT,
    });
    window.location.href = "/";
  };
};
export const signUp = ({ username, password }) => {
  return (dispatch) => {
    dispatch(setLoginLoad(true));

    API.post("auth/sign-up", { username, password })
      .then((res) => {
        if (res.code == 200) {
          cogoToast.success(`Welcome aboard @${res.response.username}!`, {
            position: "bottom-right",
          });
          dispatch({
            type: SIGN_UP,
            payload: {
              ...res.response,
            },
          });
        }
      })
      .catch((e) => console.log(e))
      .then(() => dispatch(setLoginLoad(false)));
  };
};

export const signIn = ({ username, password }) => {
  return (dispatch) => {
    dispatch(setLoginLoad(true));

    API.post("auth/sign-in", { username, password })
      .then((res) => {
        if (res.code == 200) {
          cogoToast.success(`Welcome back @${res.response.username} :)!`, {
            position: "bottom-right",
          });
          dispatch({
            type: SIGN_IN,
            payload: {
              ...res.response,
            },
          });
        }
      })
      .catch((e) => console.log(e))
      .then(() => dispatch(setLoginLoad(false)));
  };
};


export const reconnect = (last_session) => {
  return (dispatch) => {
    dispatch(setLoginLoad(true));

    dispatch({
      type: RECONNECT,
      payload: {
        last_session,
      },
    });
  };
};
export const resetLastConnection = () => {
  return (dispatch) =>
    dispatch({
      type: RESET_LAST_CONNECTION,
    });
};


