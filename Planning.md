# Planning

Table Of Contents:

- [MVP Requirements](#mvp-requirements)
- [Structure](#structure)
- [Pseudocode](#pseudocode)

## MVP Requirements

- single player game
- game states
  - pre-game: load all assets
  - in-game
  - end / post-game
- per game session
  - pre-game state
    - gets main photo from server
    - gets thumbnail images of missing characters from server
    - gets the top 5 scores for the selected photo
    - tells server to reset its game session data / state in case the player abandoned the game previously
    - tells server to update its start time when all assets (images) are loaded
  - in-game state (i.e. game is not over yet)
    - sends data to server on every click on the photo
    - gets current or updated game state data from server
    - updates displayed missing characters if needed
    - optional: updates displayed marker visual elements on the photo for positions that identify characters if needed
    - updates stopwatch every second
  - end / post-game state (after player beats the game)
    - pauses the stopwatch
    - displays a score submission form in a pop-up modal
    - hides the score form after the player submits their score or cancels / closes it
    - updates displayed score submission board if needed (e.g. if the player managed to get a run time in the top 5 scores for the current photo)
- displays
  - game title
  - brief instructions
  - missing characters / objects in photos
  - stopwatch that shows current elapsed time
  - photo / map
  - scoreboard of top scores (lowest run times)

## Structure

- (local) state
  - `isOver`: boolean that indicates if the game state is in-game (true) or not (either pre-game or post-game)
  - `didUpdateStart`: boolean that indicates if the app finished loading all the game assets (images and text) and had the server update the start time for the current game session or not
  - `photo`: object that stores the following metadata of the photo:
    - `id`: unique int identifier
    - `imageUrl`: URL link to where the photo is hosted
  - `photoObjects`: array of `photoObject` objects consisting of
    - `id`: unique int identifier
    - `name`: string name
    - `imageUrl`: URL link to where the photo is hosted
  - `foundPhotoObjectIds`: set of ints
  - `foundPhotoObjectPositions`: array of `position`'s that identify a character or object in the photo (optional)
  - `clickedPosition`: array that represents the last position that the player clicked on in the photo normalized (scaled up) against the photo's natural dimensions (width and height)
    - a 2-sized int array `[x, y]` where:
      - `x`: x-coordinate (horizontal)
      - `y`: y-coordinate (vertical)
  - `startInMS`: int that represents when the client finished loading all the assets (images) for the game in unix epoch time in milliseconds
  - `endInMS`: int that represents when the player beat the game in unix epoch time in milliseconds
  - `playerName`: string that represents the player's name
- third party libraries
  - library to format unix timestamps (13-digit integers that represents milliseconds since the unix epoch time)
  - Tailwind for quick styling
- in-house libraries
  - `serverAPILib`: helper library for making AJAX calls to the backend to get JSON data for the client with the following
  - `stopwatchLib`: helper library for initializing, starting, and pausing the displayed stopwatch
  - `utils`: library of miscellaneous utility helper functions with the following functions:
    - `scaleUpPosition()`
    - `scaleDownPosition()`
- functions / event handlers
  - `handlePhotoMapResize(event)` (optional?)
  - `handlePhotoMapClick(event)`
  - `handleScoreFormSubmit(event)`
- components
  - `Header`
  - `MissingObjects`
  - `Stopwatch`
  - `PhotoMap`
  - `ScoreForm`
  - `Scoreboard`

## Pseudocode

TODO
