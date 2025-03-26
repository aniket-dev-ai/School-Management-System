import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../Api/AuthApi";
import authReducer from "../Slice/AuthSLice";
import themeReducer from "../Slice/ThemeSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
