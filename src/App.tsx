/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  getPhotoObjects,
  getPhoto,
  getScores,
  deleteGame,
  createGame,
  startGame,
} from "./lib/serverAPILib";
import { CharactersList } from "./components/CharactersList";
import { PhotoMap } from "./components/PhotoMap";
import { Scoreboard } from "./components/Scoreboard";
import { ScoreForm } from "./components/ScoreForm";

function App() {
  const [game, setGame] = useState<any>({});
  const [loadedTimestamp, setLoadedTimestamp] = useState(0);
  const [photoObjects, setPhotoObjects] = useState<any[]>([]);
  const [photo, setPhoto] = useState<any>({});
  const [scores, setScores] = useState<any[]>([]);

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
    Promise.all(ajaxCalls).then((responses) => {
      const [photoObjects, photo, scores] = responses;
      setPhotoObjects(photoObjects);
      setPhoto(photo);
      setScores(scores);
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
    startGame(startGameParams).then((gameData) => {
      setGame(gameData);
    });
  }, [photoObjects, photo, loadedTimestamp]);

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
        {/* stopwatch */}
        {/* <div className="text-2xl mb-4">Time: 00:05</div> */}
        <PhotoMap
          {...{
            photo,
            photoObjects,
            foundPhotoObjectIds,
            setGame,
          }}
        />
        <ScoreForm />
        <Scoreboard {...{ scores }} />
      </main>
    </div>
  );
}

export default App;
