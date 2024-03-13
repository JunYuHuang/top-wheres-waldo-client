/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { getPhotoObjects, getPhoto, getScores } from "./lib/serverAPILib";
import { CharactersList } from "./components/CharactersList";
import { Scoreboard } from "./components/Scoreboard";

function App() {
  const [photoObjects, setPhotoObjects] = useState<any[]>([]);
  const [photo, setPhoto] = useState<any>({});
  const [foundPhotoObjectIds, setFoundPhotoObjectIds] = useState(
    new Set<number>()
  );
  const [scores, setScores] = useState<any[]>([]);

  const targetList = photoObjects.map((photoObject) => {
    return (
      <li key={photoObject.id} className="">
        <button className="bg-gray-200 w-full rounded-2xl py-0.5 px-4 text-xl">
          {photoObject.name}
        </button>
      </li>
    );
  });

  useEffect(() => {
    const ajaxCalls = [getPhotoObjects(), getPhoto(), getScores()];
    Promise.all(ajaxCalls).then((responses) => {
      const [photoObjects, photo, scores] = responses;
      setPhotoObjects(photoObjects);
      setPhoto(photo);
      setScores(scores);
    });
    setFoundPhotoObjectIds(new Set([]));
  }, []);

  return (
    <div className="min-h-screen">
      {/* container */}
      <main className="bg-white min-h-screen max-w-screen-xl mx-auto px-8 py-8">
        {/* header */}
        <h1 className="text-4xl mb-4">Where's Waldo?</h1>
        <p className="text-xl mb-4">
          Find and click on the missing characters in the photo!
        </p>
        <CharactersList {...{ photoObjects, foundPhotoObjectIds }} />
        {/* stopwatch */}
        {/* <div className="text-2xl mb-4">Time: 00:05</div> */}
        {/* TODO: photo map */}
        <div className="relative w-full rounded-2xl mb-4 overflow-hidden">
          <img
            src={photo.image_url}
            alt="A photo of the Where's Waldo map"
            className=""
          />
          <span
            id="target-box"
            className="absolute w-10 h-10 opacity-0 border-4 border-gray-800"
            style={{
              top: "246px",
              left: "448px",
              opacity: 1,
            }}
          ></span>
          <img
            src={photo.image_url}
            alt="A photo of the Where's Waldo map"
            id="image"
            className="absolute top-0 left-0 opacity-0 cursor-crosshair"
          ></img>
          <ul
            id="target-box-options"
            className="absolute flex flex-col gap-y-0.5 invisible"
            style={{
              top: "278px",
              left: "385px",
              visibility: "visible",
            }}
          >
            {targetList}
          </ul>
        </div>
        {/* TODO: score form */}
        <dialog
          className="bg-gray-200/90 absolute w-full h-full top-0 left-0"
          id="score-dialog"
          open={false}
        >
          <div className="h-full flex flex-col items-center justify-center">
            <form
              action="/"
              method="dialog"
              className="p-8 rounded-2xl bg-white"
              id="score-form"
            >
              <h2 className="text-2xl font-bold">New Run</h2>
              <p className="text-xl">Your beat the game!</p>
              <p className="text-xl">Your run time: 00:05</p>
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
                  className="border-black border-2 rounded-2xl p-2 text-xl"
                  // value="Player 1"
                  required
                />
                <br />
                <br />
              </div>
              <div className="flex flex-row items-center justify-between gap-x-4">
                <button
                  type="button"
                  className="border-black border-2 rounded-2xl p-2 w-full text-xl"
                  id="cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border-black border-2 rounded-2xl p-2 w-full text-xl"
                  id="start-game-button"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <Scoreboard {...{ scores }} />
      </main>
    </div>
  );
}

export default App;
