import {
  TABLE_RECEIVE_USERS_DATA,
  TABLE_ADD_NEW_RECORD,
  TABLE_SET_IS_FETCHING,
  TABLE_EDIT_USER,
  TABLE_SET_EDITING_ID,
  TABLE_DELETE_USER,
} from "./constants";

const initialState = {
  users: [],
  isFetching: false,
  editingId: null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TABLE_RECEIVE_USERS_DATA:
      if (action.payload) {
        return { ...state, users: action.payload };
      }
      return state;
    case TABLE_ADD_NEW_RECORD:
      return { ...state, users: state.users.concat([action.payload]) };
    case TABLE_EDIT_USER: {
      return { ...state, users: action.payload };
    }
    case TABLE_DELETE_USER:
      return state;
    case TABLE_SET_IS_FETCHING:
      return { ...state, isFetching: action.payload };
    case TABLE_SET_EDITING_ID:
      return { ...state, editingId: action.payload };
    default:
      return state;
  }
};
