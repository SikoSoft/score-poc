import React, { ReactElement, useState } from "react";
import { useReduxSelector } from "../store/hooks";
import { allScores } from "../store/leaderboard";
import { Collapse } from "@northlight/ui";
import { Box, Card } from "@chakra-ui/react";
import "./ScoreCard.css";

declare interface ScoreCordProps {
  userId: number;
  userName: string;
  points: number;
}

function ScoreCard({ userId, userName, points }: ScoreCordProps): ReactElement {
  const [showAll, setShowAll] = useState(false);
  const userScores = useReduxSelector(allScores).filter(
    (score) => score.userId === userId,
  );

  const toggleAll = () => {
    setShowAll(!showAll);
  };

  return (
    <Card
      key={`${userId}:${points}`}
      padding={4}
      margin={2}
      onClick={toggleAll}
      className="score-card"
    >
      <div className="overview">
        <span className="name">{userName}</span>
        <Box
          shadow="md"
          letterSpacing="tighter"
          borderWidth="xs"
          background="gray.50"
          padding="2"
          className="points"
        >
          {points}
        </Box>
      </div>
      <Collapse in={showAll}>
        <h3>Every score by {userName}:</h3>
        <ul>
          {userScores.map((score, index) => (
            <li key={index}>{score.points}</li>
          ))}
        </ul>
      </Collapse>
      <div className="all"></div>
    </Card>
  );
}

export default ScoreCard;
