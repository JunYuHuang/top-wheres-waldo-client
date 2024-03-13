/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

const SERVER_BASE_URL = "http://localhost:3000";
const DEFAULT_PHOTO_ID = 1;

async function getPhotoObjects(photoId = DEFAULT_PHOTO_ID) {
  const url = `${SERVER_BASE_URL}/photos/${photoId}/photo_objects`;
  const options: RequestInit = {
    method: "GET",
    mode: "cors",
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Network response was not OK");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error getting photo objects:", error);
    return [];
  }
}

async function getPhoto(photoId = DEFAULT_PHOTO_ID) {
  const url = `${SERVER_BASE_URL}/photos/${photoId}`;
  const options: RequestInit = {
    method: "GET",
    mode: "cors",
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Network response was not OK");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error getting photo objects:", error);
    return { id: -1, image_url: "hehexd" };
  }
}

async function getScores(photoId = DEFAULT_PHOTO_ID) {
  const url = `${SERVER_BASE_URL}/photos/${photoId}/scores`;
  const options: RequestInit = {
    method: "GET",
    mode: "cors",
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Network response was not OK");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error getting photo objects:", error);
    return [];
  }
}

// async function createGame(photoId = DEFAULT_PHOTO_ID) {
//   // TODO
// }

// async function updateGame(photoId = DEFAULT_PHOTO_ID) {
//   // TODO
// }

export {
  getPhotoObjects,
  getPhoto,
  getScores,
  // createGame,
  // updateGame,
}
