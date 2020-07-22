import api from "../api/api";
import axios from "axios";
import cogoToast from "cogo-toast";
const API = new api();

export const RESET_LAST_CONNECTION = "[App] RESET_LAST_CONNECTION",
  SET_LOGIN_LOADING = "[APP] SET_LOGIN_LOADING",
  RECONNECT = "[APP] RECONNECT",
  SIGN_UP = "[APP] SIGN_UP",
  SIGN_IN = "[APP] SIGN_IN",
  LOGOUT = "[APP] LOGOUT",
  ROOMS = "[APP] ROOMS",
  CREATE_NEW_CHANNEL = "[APP] CREATE_NEW_CHANNEL",
  SET_CHANNEL_NAME = "[APP] SET_CHANNEL_NAME";

export const setLoginLoad = (value) => {
  return (dispatch) =>
    dispatch({
      type: SET_LOGIN_LOADING,
      payload: {
        value,
      },
    });
};
export const sendChatMessages = (message) => {
  return (dispatch) =>
    dispatch({
      type: "RECIEVED_MESSAGES",
      payload: message,
    });
};

export const setChannelName = (value) => {
  // console.log("value", value);
  return (dispatch) => {
    dispatch({
      type: "SET_CHANNEL_NAME",
      payload: {
        value,
      },
    });
  };
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

export const createNewChannel = (newChannel) => {
  console.log("channel action", newChannel);
  return (dispatch) => {
    API.post("room/create-room", newChannel)
      .then((res) => {
        if (res.code == 200) {
          cogoToast.success(`Channel Created`, {
            position: "bottom-right",
          });
          dispatch({
            type: "CREATE_NEW_CHANNEL",
            payload: res,
          });
        }
      })
      .catch((e) => console.log(e));
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

export function fetchRooms() {
  return (dispatch) => {
    let room = fetch(`http://localhost:5000/api/room/get-rooms`);
    var roomsArr = [];
    room.then((room) => {
      room = room.json();
      room.then((res) => {
        roomsArr = res;
        // console.log(roomsArr);
        dispatch({
          type: "ROOMS",
          payload: roomsArr,
        });
      });
    });
  };
}
