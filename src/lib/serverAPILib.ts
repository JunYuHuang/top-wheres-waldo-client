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

async function createScore(playerName: string, photoId = DEFAULT_PHOTO_ID) {
  const url = `${SERVER_BASE_URL}/photos/${photoId}/scores`;
  const options: RequestInit = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      player_name: playerName
    })
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Network response was not OK");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error getting photo objects:", error);
    return {};
  }
}

async function createGame(photoId = DEFAULT_PHOTO_ID) {
  const url = `${SERVER_BASE_URL}/games`;
  const options: RequestInit = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      photo_id: photoId
    })
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Network response was not OK");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error getting photo objects:", error);
    return {};
  }
}

interface startGameParams {
  didUpdateStart: boolean;
  timestampInMS: number;
}

async function startGame(params: startGameParams) {
  const { didUpdateStart, timestampInMS } = params;
  const url = `${SERVER_BASE_URL}/games/lol`;
  const options: RequestInit = {
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify({
      did_update_start: didUpdateStart,
      timestamp_in_ms: timestampInMS
    })
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Network response was not OK");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error getting photo objects:", error);
    return {};
  }
}

interface updateGameParams {
  timestampInMS: number;
  objectId: number,
  targetX: number,
  targetY: number,
}

async function updateGame(params: updateGameParams) {
  const { timestampInMS, objectId, targetX, targetY } = params;
  const url = `${SERVER_BASE_URL}/games/lol`;
  const options: RequestInit = {
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify({
      timestamp_in_ms: timestampInMS,
      did_update_start: true,
      object_id: objectId,
      target_x: targetX,
      target_y: targetY,
    })
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Network response was not OK");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error getting photo objects:", error);
    return {};
  }
}

async function deleteGame() {
  const url = `${SERVER_BASE_URL}/games/lol`;
  const options: RequestInit = {
    method: "DELETE",
    mode: "cors",
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Network response was not OK");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error getting photo objects:", error);
    return {};
  }
}

export {
  getPhotoObjects,
  getPhoto,
  getScores,
  createScore,
  createGame,
  startGame,
  updateGame,
  deleteGame,
}
