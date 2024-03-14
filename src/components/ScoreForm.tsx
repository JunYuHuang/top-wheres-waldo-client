export default function ScoreForm() {
  return (
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
  );
}
