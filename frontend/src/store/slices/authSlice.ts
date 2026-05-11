import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
};

type AuthState = {
  currentUser: User | null;
};

const initialAuthState: AuthState = {
  currentUser: null,
};

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

export const { login, logout } = authSlice.actions;
