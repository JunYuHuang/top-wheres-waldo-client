/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { updateGame } from "../lib/serverAPILib";

// TODO
// - `scaleUpPosition()`
// - `scaledownPosition()`

interface PhotoMapProps {
  photo: {
    id: number;
    image_url: string;
  };
  photoObjects: {
    id: number;
    name: string;
    image_url: string;
  }[];
  foundPhotoObjectIds: Set<number>;
  setGame: React.Dispatch<any>;
}

export function PhotoMap({ photo, photoObjects }: PhotoMapProps) {
  const [originalPhotoSize, setOriginalPhotoSize] = useState<any>({
    width: 1,
    height: 1,
  });
  const [photoSize, setPhotoSize] = useState<any>({
    width: 1,
    height: 1,
  });
  const [targetPosition, setTargetPosition] = useState<any>({
    x: 0,
    y: 0,
  });
  const [isTargetVisible, setIsTargetVisible] = useState<boolean>(false);

  // Log state changes
  useEffect(() => {
    console.log(
      `State @ ${new Date(Date.now()).toISOString()}`,
      `\n> OriginalPhotoSize: \n`,
      originalPhotoSize,
      `\n> photoSize: \n`,
      photoSize,
      `\n> targetPosition: \n`,
      targetPosition,
      `\n> isTargetVisible: \n`,
      isTargetVisible
    );
  }, [originalPhotoSize, photoSize, targetPosition, isTargetVisible]);

  // `event` type should be `React.SyntheticEvent<HTMLImageElement, Event>`
  const handlePhotoLoad = (event: any) => {
    const { naturalWidth, naturalHeight } = event.target;
    setOriginalPhotoSize({
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const handlePhotoClick = (event: any) => {
    const { width, height } = event.target;
    setPhotoSize({ width, height });

    // TODO
    // - move target box to center of clicked position
    // - move target buttons under target box
    const { offsetX, offsetY } = event.nativeEvent;
    setTargetPosition({ x: offsetX, y: offsetY });
    setIsTargetVisible(true);
  };

  const handleTargetClick = (event: any) => {
    const timestampInMS = Date.now();
    const objectId = Number(event.target.dataset.photoObjectId);
    if (!Number.isInteger(objectId)) return;

    // TODO
    // - hide target box and target buttons
    // - do nothing if clicked position's associated object has been found
    // - send PATCH request to server with data
    // - update game state with response from server
    setIsTargetVisible(false);
  };

  const targetList = photoObjects.map((photoObject) => {
    return (
      <li key={photoObject.id}>
        <button
          data-photo-object-id={photoObject.id}
          className="bg-gray-200 w-full rounded-2xl py-0.5 px-4 text-xl"
        >
          {photoObject.name}
        </button>
      </li>
    );
  });

  return (
    <div className="relative w-full rounded-2xl mb-4 overflow-hidden">
      <img
        src={photo.image_url}
        alt="A photo of the Where's Waldo map"
        className=""
      />
      <span
        id="target-box"
        className="absolute w-10 h-10 border-4 border-gray-800"
        style={{
          top: "246px",
          left: "448px",
          visibility: `${isTargetVisible ? "visible" : "hidden"}`,
        }}
      ></span>
      <img
        src={photo.image_url}
        alt="A photo of the Where's Waldo map"
        id="image"
        className="absolute top-0 left-0 opacity-0 cursor-crosshair"
        onLoad={handlePhotoLoad}
        onClick={handlePhotoClick}
      ></img>
      <ul
        id="target-box-options"
        className="absolute flex flex-col gap-y-0.5 invisible"
        style={{
          top: "278px",
          left: "385px",
          visibility: `${isTargetVisible ? "visible" : "hidden"}`,
        }}
        onClick={handleTargetClick}
      >
        {targetList}
      </ul>
    </div>
  );
}
