import { ReactElement, useEffect, useRef, useState } from "react";
import React, { Routes, Route } from "react-router-dom";
import { useReduxDispatch } from "./store/hooks";
import defaultUsers from "./users";
import defaultScores from "./scores";

import Import from "./views/Import";
import Scores from "./views/Scores";
import AddScore from "./views/AddScore";
import NotFound from "./views/NotFound";
import { addScore, addUser } from "./store/leaderboard";

function PageRouter(): ReactElement {
  const dispatch = useReduxDispatch();
  const instanceRef = useRef(false);

  const seedData = () => {
    defaultUsers.forEach((user) => {
      dispatch(addUser({ id: user._id, name: user.name }));
    });

    defaultScores.forEach((score) => {
      dispatch(addScore({ points: score.score, userId: score.userId }));
    });
  };

  useEffect(() => {
    if (instanceRef.current) {
      return;
    }

    seedData();

    instanceRef.current = true;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Scores />} />
      <Route path="/add" element={<AddScore />} />
      <Route path="/import" element={<Import />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default PageRouter;
