import React, { ReactElement } from "react";
import { useReduxSelector } from "../store/hooks";
import { topScores } from "../store/leaderboard";
import ScoreCard from "../components/ScoreCard";
import { Container } from "@chakra-ui/react";

function Scores(): ReactElement {
  const scores = useReduxSelector(topScores);

  return (
    <Container padding="4">
      {scores.map((score) => (
        <ScoreCard
          key={score.userId}
          userId={score.userId}
          userName={score.user.name}
          points={score.points}
        ></ScoreCard>
      ))}
    </Container>
  );
}

export default Scores;
