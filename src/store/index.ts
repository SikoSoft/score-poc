import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import leaderboardReducer from "./leaderboard";

export const store = configureStore({
  reducer: {
    leaderboard: leaderboardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
