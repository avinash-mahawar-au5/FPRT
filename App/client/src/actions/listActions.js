import { RETRIEVE_ALL_BOARDS } from "./actionTypes";
import axios from "../axios-users";
import uuid from "uuid";

export const getAllBoards = () => {
  return async (dispatch) => {
    const res = await axios.get("/boards/all");
    const { boards } = res.data;

    dispatch({
      type: RETRIEVE_ALL_BOARDS,
      payload: boards,
    });
  };
};
