/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { getPhotoObjects, getPhoto, getScores } from "./lib/serverAPILib";
import { CharactersList } from "./components/CharactersList";
import { PhotoMap } from "./components/PhotoMap";
import { Scoreboard } from "./components/Scoreboard";
import { ScoreForm } from "./components/ScoreForm";

function App() {
  const [photoObjects, setPhotoObjects] = useState<any[]>([]);
  const [photo, setPhoto] = useState<any>({});
  const [foundPhotoObjectIds, setFoundPhotoObjectIds] = useState(
    new Set<number>()
  );
  const [scores, setScores] = useState<any[]>([]);

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
        <PhotoMap {...{ photo, photoObjects }} />
        <ScoreForm />
        <Scoreboard {...{ scores }} />
      </main>
    </div>
  );
}

export default App;
