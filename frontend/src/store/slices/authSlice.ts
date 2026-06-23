import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../../api/loginApi";
import { connectSocket, disconnectSocket } from "../../api/socket";
import type { AppDispatch, RootState } from "../store";
import { getUser, removeUser, saveUser } from "../../utils/storage";

type User = {
  id: string;
  name: string;
};

type AuthState = {
  currentUser: User | null;
};

const initialAuthState: AuthState = {
  currentUser: getUser(),
};

export function loginUserThunk(inputValue: string) {
  return async (dispatch: AppDispatch) => {
    const user = await loginUser(inputValue);

    if (!user) {
      console.error("Ошибка входа: пользователь не найден");
      return;
    }

    connectSocket();
    dispatch(login(user));
    saveUser(user);
  };
}

export function logoutUserThunk() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const currentUser = getState().auth.currentUser;

    if (!currentUser) {
      console.error("Ошибка выхода: пользователь не найден");
      return;
    }

    const isUserExit = await logoutUser(currentUser.name);

    if (!isUserExit) {
      console.error("Ошибка выхода: не удалось выйти из системы");
      return;
    }

    disconnectSocket();
    dispatch(logout());
    removeUser();

    return true;
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

const { login, logout } = authSlice.actions;
