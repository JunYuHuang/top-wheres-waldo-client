import { formatDuration } from "../lib/utilsLib";
interface ScoreboardProps {
  scores: {
    id: number;
    player_name: string;
    run_length_in_ms: number;
  }[];
}

export function Scoreboard({ scores }: ScoreboardProps) {
  const scoreRows = scores.map((score) => {
    return (
      <tr key={score.id} className="">
        <td className="text-xl pr-6 py-1">
          {formatDuration(score.run_length_in_ms)}
        </td>
        <td className="text-xl pr-6 py-1">{score.player_name}</td>
      </tr>
    );
  });

  return (
    <div className="">
      <h2 className="text-2xl">Fastest Runs</h2>
      <table className="table-auto border-spacing-1">
        <thead>
          <tr>
            <th className="text-xl text-left pr-6 py-1">Time (HH:MM:SS)</th>
            <th className="text-xl text-left pr-6 py-1">Player</th>
          </tr>
        </thead>
        <tbody>{scoreRows}</tbody>
      </table>
    </div>
  );
}
