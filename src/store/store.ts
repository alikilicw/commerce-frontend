import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";

interface DynamicState {
  [key: string]: any;
}

const initialState: DynamicState = {};

const shortTermStorage = createSlice({
  name: "dynamic",
  initialState,
  reducers: {
    setKey: (state, action: PayloadAction<{ key: string; value: string }>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    removeKey: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { setKey, removeKey } = shortTermStorage.actions;

const store = configureStore({
  reducer: {
    storage: shortTermStorage.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
