import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { ExcelRow } from "../excel-dropzone";

export interface User {
  id: number;
  name: string;
}

export interface Score {
  points: number;
  userId: number;
}

export interface EnrichedScore extends Score {
  user: User;
}

export type UserScoreMap = Map<number, number>;

export interface LeaderboardState {
  scores: Score[];
  users: Record<number, User>;
  nextUserId: number;
}

const initialState: LeaderboardState = {
  scores: [],
  users: {},
  nextUserId: 0,
};

export const leaderboardSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<Score>) => {
      state.scores = [...state.scores, action.payload];
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users = {
        ...state.users,
        ...{
          [action.payload.id]: {
            name: action.payload.name,
            id: action.payload.id,
          },
        },
      };
      state.nextUserId = action.payload.id + 1;
      console.log(`the new nextId is : ${state.nextUserId}`);
    },
    importData: (state, action: PayloadAction<ExcelRow[]>) => {
      let nextUserId = state.nextUserId;
      let users = { ...state.users };
      let scores = [...state.scores];

      action.payload.forEach((row) => {
        let userId = Object.values(users).find(
          (user) => user.name === row.name,
        )?.id;
        if (!userId) {
          addUser({ name: row.name, id: state.nextUserId });
          users = {
            ...users,
            [nextUserId]: { name: row.name, id: nextUserId },
          };
          userId = nextUserId;
          nextUserId++;
        }

        scores = [...scores, { points: row.score, userId }];
      });

      state.nextUserId = nextUserId;
      state.users = users;
      state.scores = scores;
    },
  },
});

export const { addScore, addUser, importData } = leaderboardSlice.actions;

export const topScores = (state: RootState): EnrichedScore[] => {
  return [...state.leaderboard.scores]
    .sort((a, b) => b.points - a.points)
    .reduce((uniqueScores, score) => {
      if (
        !uniqueScores.find((uniqueScore) => uniqueScore.userId === score.userId)
      ) {
        return [...uniqueScores, score];
      }
      return uniqueScores;
    }, [] as Score[])
    .map((score) => ({
      ...score,
      user: {
        name: state.leaderboard.users[score.userId].name,
        id: score.userId,
      },
    }));
};

export const allScores = (state: RootState): EnrichedScore[] => {
  return [...state.leaderboard.scores]
    .sort((a, b) => b.points - a.points)
    .map((score) => ({
      ...score,
      user: {
        name: state.leaderboard.users[score.userId].name,
        id: score.userId,
      },
    }));
};

export default leaderboardSlice.reducer;
