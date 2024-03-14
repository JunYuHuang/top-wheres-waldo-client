/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { updateGame } from "../lib/serverAPILib";

interface scaleUpPositionArgs {
  x: number;
  y: number;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
}

function scaleUpPosition(args: scaleUpPositionArgs) {
  const { x, y, width, height, originalWidth, originalHeight } = args;
  return {
    x: Math.round(x * (originalWidth / width)),
    y: Math.round(y * (originalHeight / height)),
  };
}

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

export function PhotoMap({
  photo,
  photoObjects,
  foundPhotoObjectIds,
  setGame,
}: PhotoMapProps) {
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
    const scaledTargetPosition = scaleUpPosition({
      x: targetPosition.x,
      y: targetPosition.y,
      width: photoSize.width,
      height: photoSize.height,
      originalWidth: originalPhotoSize.width,
      originalHeight: originalPhotoSize.height,
    });
    console.log(
      `PhotoMap: State @ ${new Date(Date.now()).toISOString()}`,
      `\n> OriginalPhotoSize: \n`,
      originalPhotoSize,
      `\n> photoSize: \n`,
      photoSize,
      `\n> targetPosition: \n`,
      targetPosition,
      `\n> scaledTargetPosition: \n`,
      scaledTargetPosition,
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
    const { offsetX, offsetY } = event.nativeEvent;
    setTargetPosition({ x: offsetX, y: offsetY });
    setIsTargetVisible(true);
  };

  const handleTargetClick = (event: any) => {
    const timestampInMS = Date.now();
    const objectId = Number(event.target.dataset.photoObjectId);
    if (!Number.isInteger(objectId)) return;
    setIsTargetVisible(false);
    if (foundPhotoObjectIds.has(objectId)) return;

    const scaledTargetPosition = scaleUpPosition({
      x: targetPosition.x,
      y: targetPosition.y,
      width: photoSize.width,
      height: photoSize.height,
      originalWidth: originalPhotoSize.width,
      originalHeight: originalPhotoSize.height,
    });
    const params = {
      timestampInMS,
      objectId,
      targetX: scaledTargetPosition.x,
      targetY: scaledTargetPosition.y,
    };
    updateGame(params).then((gameData) => {
      if (Object.keys(gameData).length === 0) return;
      setGame(gameData);
    });
  };

  const targetList = photoObjects.map((photoObject) => {
    return (
      <li key={photoObject.id} className="shrink-0">
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
    <div className="relative w-full mb-4 ">
      <img
        src={photo.image_url}
        alt="A photo of the Where's Waldo map"
        className="rounded-2xl overflow-hidden"
      />
      <span
        id="target-box"
        className="absolute w-[32px] h-[32px] border-[3px] border-gray-200 rounded-2xl shadow-md shadow-black"
        style={{
          top: `${targetPosition.y - 16}px`,
          left: `${targetPosition.x - 16}px`,
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
        className="absolute flex flex-col gap-y-0.5 invisible min-w-fit"
        style={{
          top: `${targetPosition.y + 16}px`,
          left: `${targetPosition.x - 80}px`,
          visibility: `${isTargetVisible ? "visible" : "hidden"}`,
        }}
        onClick={handleTargetClick}
      >
        {targetList}
      </ul>
    </div>
  );
}
