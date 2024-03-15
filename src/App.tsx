/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import {
  getPhotoObjects,
  getPhoto,
  getScores,
  deleteGame,
  createGame,
  startGame,
} from "./lib/serverAPILib";
import useStopwatch from "./lib/useStopwatch";
import CharactersList from "./components/CharactersList";
import PhotoMap from "./components/PhotoMap";
import Scoreboard from "./components/Scoreboard";
import ScoreForm from "./components/ScoreForm";
import Stopwatch from "./components/Stopwatch";

function openScoreForm() {
  const dialog: HTMLDialogElement | null =
    document.querySelector("#score-dialog");
  if (!dialog) return;
  if (dialog.tagName !== "DIALOG") return;
  dialog.showModal();
}

function closeScoreForm() {
  const dialog: HTMLDialogElement | null =
    document.querySelector("#score-dialog");
  if (!dialog) return;
  if (dialog.tagName !== "DIALOG") return;
  dialog.close();
}

function App() {
  const [game, setGame] = useState<any>({});
  const [loadedTimestamp, setLoadedTimestamp] = useState(0);
  const [photoObjects, setPhotoObjects] = useState<any[]>([]);
  const [photo, setPhoto] = useState<any>({});
  const [scores, setScores] = useState<any[]>([]);
  const stopwatch = useStopwatch();
  const { start, stop, reset, elapsedTimeInMS } = stopwatch;

  // Log the state as it changes
  useEffect(() => {
    console.log(
      `App: State @ ${new Date(Date.now()).toISOString()}`,
      `\n> Game: \n`,
      game,
      `\n> loadedTimestamp: \n`,
      loadedTimestamp,
      `\n> photoObjects: \n`,
      photoObjects,
      `\n> photo: \n`,
      photo,
      `\n> Scores: \n:`,
      scores
    );
  }, [game, loadedTimestamp, photoObjects, photo, scores]);

  /*
    - Reset the game session
    - Create a new game session
  */
  useEffect(() => {
    deleteGame().then(() => {
      createGame().then((gameData) => {
        if (Object.keys(gameData).length === 0) return;
        setGame(gameData);
      });
    });
  }, []);

  /*
    - Load initial game assets
  */
  useEffect(() => {
    if (Object.keys(game).length === 0) return;
    if (game.did_update_start === true) return;

    const ajaxCalls = [getPhotoObjects(), getPhoto(), getScores()];
    Promise.all(ajaxCalls)
      .then((responses) => {
        const [photoObjects, photo, scores] = responses;
        setPhotoObjects(photoObjects);
        setPhoto(photo);
        setScores(scores);
      })
      .then(() => {
        setLoadedTimestamp(Date.now());
      });
  }, [game]);

  /*
    - Update the game session's start time after assets load
  */
  useEffect(() => {
    if (photoObjects.length === 0) return;
    if (Object.keys(photo).length === 0) return;
    if (loadedTimestamp === 0) return;

    const startGameParams = { timestampInMS: loadedTimestamp };
    startGame(startGameParams)
      .then((gameData) => {
        setGame(gameData);
      })
      .then(() => {
        stopwatch.reset();
        stopwatch.start();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoObjects, photo, loadedTimestamp]);

  // Handles post-game score submission
  useEffect(() => {
    if (Object.keys(game).length === 0) return;
    if (game.is_over !== true) return;
    if (game.end_in_ms === -1) return;

    stopwatch.stop(game.end_in_ms - game.start_in_ms);
    openScoreForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  const foundPhotoObjectIds = new Set<number>(
    Array.isArray(game.found_object_ids) ? game.found_object_ids : []
  );

  return (
    <div className="min-h-screen">
      {/* container */}
      <main className="bg-white min-h-screen max-w-screen-xl mx-auto px-4 py-4 sm:p-16">
        {/* header */}
        <h1 className="text-4xl mb-4">Where's Waldo?</h1>
        <p className="text-xl mb-4">
          Find and click on the missing characters in the photo!
        </p>
        <CharactersList {...{ photoObjects, foundPhotoObjectIds }} />
        <Stopwatch
          {...{
            shownElapsedTimeInMS: elapsedTimeInMS,
            start,
            stop,
            reset,
            isDebugMode: true,
          }}
        />
        <PhotoMap
          {...{
            photo,
            photoObjects,
            foundPhotoObjectIds,
            setGame,
            isGameOver: Boolean(game.is_over),
          }}
        />
        <ScoreForm
          {...{
            openForm: openScoreForm,
            closeForm: closeScoreForm,
            runLengthInMS: elapsedTimeInMS,
            isGameOver: Boolean(game.is_over),
            setScores,
            isDebugMode: true,
          }}
        />
        <Scoreboard {...{ scores }} />
      </main>
    </div>
  );
}

export default App;
