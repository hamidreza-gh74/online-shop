import { cartReducer } from "./slices/cartSlices";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    shoppingCart: persistedReducer,
  },
});

export const persistor = persistStore(store);
