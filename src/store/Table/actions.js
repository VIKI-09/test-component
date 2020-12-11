import {
  TABLE_RECEIVE_USERS_DATA,
  TABLE_SET_IS_FETCHING,
  TABLE_ADD_NEW_RECORD,
  TABLE_EDIT_USER,
  TABLE_SET_EDITING_ID,
} from "./constants";
import { addUser, getUsers, updateUser } from "../../services/api";

export const getTableData = () => async (dispatch) => {
  dispatch({ type: TABLE_SET_IS_FETCHING, payload: true });
  try {
    const response = await getUsers();
    dispatch({ type: TABLE_RECEIVE_USERS_DATA, payload: response.data });
    dispatch({ type: TABLE_SET_IS_FETCHING, payload: false });
  } catch (e) {
    console.error(e);
  }
};

export const addNewRecord = (newUser) => async (dispatch) => {
  try {
    const response = await addUser(newUser);
    dispatch({ type: TABLE_ADD_NEW_RECORD, payload: response.data });
    dispatch({
      type: TABLE_SET_EDITING_ID,
      payload: response.data.id,
    });
  } catch (e) {
    console.error(e);
  }
};
export const setEditingId = (id) => ({
  type: TABLE_SET_EDITING_ID,
  payload: id,
});

export const editUser = (updatedList, updatedUser) => async (dispatch) => {
  try {
    const data = { ...updatedUser };
    delete data.id;
    const response = await updateUser(data, updatedUser.id);
    console.log(response);
    dispatch({ type: TABLE_EDIT_USER, payload: updatedList });
  } catch (e) {
    console.error(e);
  }
};
