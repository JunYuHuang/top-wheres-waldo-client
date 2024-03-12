/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

function App() {
  const [photoObjects, setPhotoObjects] = useState([
    {
      id: 1,
      name: "Waldo",
      image_url: "http://localhost:3000/object_waldo.png",
    },
    {
      id: 2,
      name: "Wenda",
      image_url: "http://localhost:3000/object_wenda.png",
    },
    {
      id: 3,
      name: "Woof (His Tail)",
      image_url: "http://localhost:3000/object_woof.png",
    },
  ]);
  const [photo, setPhoto] = useState({
    id: 1,
    image_url: "http://localhost:3000/photo_1.png",
  });

  const photoObjectList = photoObjects.map((photoObject) => {
    return (
      <li
        key={photoObject.id}
        className="flex flex-row items-center gap-x-2 max-w-fit"
      >
        <div className="w-12 h-12 overflow-hidden bg-gray-200 flex flex-col justify-center rounded-2xl">
          <img
            src={photoObject.image_url}
            alt={`A photo of the character ${photoObject.name}`}
            className="max-w-full max-h-full object-contain object-top mx-auto"
          />
        </div>
        <span className="">{photoObject.name}</span>
      </li>
    );
  });

  const targetList = photoObjects.map((photoObject) => {
    return (
      <li key={photoObject.id} className="">
        <button className="bg-gray-200 w-full rounded-2xl py-0.5 px-1.5 text-sm">
          {photoObject.name}
        </button>
      </li>
    );
  });

  return (
    <div className="bg-red-200 min-h-screen">
      {/* container */}
      <main className="bg-white min-h-screen max-w-screen-xl mx-auto px-8 py-8">
        {/* header */}
        <h1 className="text-4xl mb-4">Where's Waldo?</h1>
        <p className="mb-4">
          Find and click on the missing characters in the photo!
        </p>
        {/* missing characters */}
        <div className="mb-4">
          <h2 className="mb-4">Missing Character(s):</h2>
          <ul className="flex flex-col gap-y-3">{photoObjectList}</ul>
        </div>
        {/* stopwatch */}
        <div className="mb-4">Time: 00:05</div>
        {/* TODO: photo map */}
        <div className="relative w-full h-full rounded-2xl">
          <img
            src={photo.image_url}
            alt="A photo of the Where's Waldo map"
            className="absolute rounded-2xl"
          />
          <span
            id="target-box"
            className="absolute w-10 h-10 opacity-0 border-4 border-slate-800"
            style={{
              top: "246px",
              left: "448px",
              opacity: 1,
            }}
          ></span>
          <ul
            id="target-box-options"
            className="absolute flex flex-col gap-y-1 invisible"
            style={{
              top: "286px",
              left: "448px",
              visibility: "visible",
            }}
          >
            {targetList}
          </ul>
        </div>
        {/* TODO: score form */}
        {/* TODO: scoreboard */}
      </main>
    </div>
  );
}

export default App;
