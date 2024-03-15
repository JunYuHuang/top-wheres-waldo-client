/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { formatDuration } from "../lib/utilsLib";
import { createScore, getScores } from "../lib/serverAPILib";

function isValidPlayerName(name: string) {
  const noWhitespaceName = name.replace(/\s/gi, "");
  return noWhitespaceName.length > 0;
}

interface ScoreFormProps {
  openForm: any;
  closeForm: any;
  runLengthInMS: number;
  isGameOver: boolean;
  setScores: React.Dispatch<any>;
  isDebugMode: boolean;
}

export default function ScoreForm({
  openForm,
  closeForm,
  runLengthInMS,
  isGameOver,
  setScores,
  isDebugMode,
}: ScoreFormProps) {
  const [playerName, setPlayerName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePlayerNameOnChange = (e: any) => {
    setPlayerName(e.target.value);
  };

  const handleCancelClick = () => {
    closeForm();
  };

  /*
  - TODO: fix bug where form cannot be closed after score is submitted
  - TODO: prevent form from being spam submitted
  */
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (!isGameOver) {
      console.log("💀 Cannot submit score because game is not over!");
      closeForm();
      return;
    }
    if (!isValidPlayerName(playerName)) {
      setErrorMessage(
        `'${playerName}' is not a valid name. \nPlease try again.`
      );
      return;
    }

    setErrorMessage("");
    closeForm();
    createScore(playerName)
      .then((scoreData) => {
        if (Object.keys(scoreData).length === 0)
          throw new Error("Failed to submit score!");
        console.log("Form submitted");
      })
      .then(() => {
        getScores()
          .then((scoresData) => {
            if (scoresData.length === 0)
              throw new Error("Failed to fetch scores!");
            setScores(scoresData);
          })
          .catch((error) => {
            console.error("Error fetching scores:\n", error);
          });
      })
      .catch((error) => {
        console.error("Error submitting score:\n", error);
        setErrorMessage("Error submitting run 🙁");
      });
  };

  return (
    <>
      {isDebugMode ? (
        <div className="flex flex-row items-center gap-x-1 mb-4">
          <button
            onClick={() => openForm()}
            className="bg-gray-200 rounded-2xl py-0.5 px-4 text-xl"
          >
            Open Form
          </button>
        </div>
      ) : (
        ""
      )}

      <dialog
        className="bg-gray-200/90 absolute w-full h-full top-0 left-0"
        id="score-dialog"
      >
        <div className="h-full flex flex-col items-center justify-center">
          <form
            action="/"
            method="dialog"
            className="p-8 rounded-2xl bg-white"
            id="score-form"
            onSubmit={handleFormSubmit}
          >
            <h2 className="text-2xl font-bold">New Run</h2>
            <p className="text-xl">You beat the game!</p>
            <p className="text-xl">
              Your time: {formatDuration(runLengthInMS)}
            </p>
            <p className="text-xl">Please submit your run.</p>
            <br />
            <div className="">
              <label htmlFor="player-name" className="text-xl">
                Your Name:
              </label>
              <br />
              <input
                type="text"
                name="player-name"
                id="player-name"
                className="bg-gray-200 rounded-2xl py-0.5 px-4 text-xl shadow-sm shadow-gray-200 w-full mt-1"
                value={playerName}
                onChange={handlePlayerNameOnChange}
                required
              />
              <br />
              <br />
            </div>
            {errorMessage.length > 0 ? (
              <>
                <p className="text-xl whitespace-pre text-red-900">
                  {errorMessage}
                </p>
                <br />
              </>
            ) : (
              ""
            )}
            <div className="flex flex-row items-center justify-between gap-x-4">
              <button
                type="button"
                className="bg-gray-200 rounded-2xl py-0.5 px-4 text-xl shadow-sm shadow-gray-200 w-full"
                id="cancel-button"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gray-200 rounded-2xl py-0.5 px-4 text-xl shadow-sm shadow-gray-200 w-full"
                id="start-game-button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
