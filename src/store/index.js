// import { configureStore } from "@reduxjs/toolkit";
import { userReducer, userSlice } from "./users/users-slice";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { activeUserReducer } from "./users/active-user-slice";

const rootReducer = combineReducers({
  userSlice: userReducer,
  activeUserSlice: activeUserReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["userSlice", "activeUserSlice"],
  // whitelist: ["userSlice", "activeUserSlice"],
};

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
