import React, { ReactElement, useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../store/hooks";
import { addScore, addUser } from "../store/leaderboard";
import { Input } from "@northlight/ui";
import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

function AddScore(): ReactElement {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(0);

  const users = useReduxSelector((state) => state.leaderboard.users);
  const nextUserId = useReduxSelector((state) => state.leaderboard.nextUserId);

  const dispatch = useReduxDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleButtonClick = () => {
    addNewScore();
    setName("");
    setPoints(0);
  };

  const addNewScore = () => {
    let userId = Object.values(users).find((user) => user.name === name)?.id;

    if (!userId) {
      userId = nextUserId;
      dispatch(addUser({ name, id: nextUserId }));
    }

    dispatch(addScore({ points, userId }));
  };

  return (
    <>
      <Input
        type="text"
        onChange={handleNameChange}
        value={name}
        placeholder="Name"
      />
      <NumberInput
        onChange={(stringValue) => setPoints(parseInt(stringValue))}
        value={points}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button onClick={handleButtonClick} variant="success">
        Add Score
      </Button>
    </>
  );
}

export default AddScore;
