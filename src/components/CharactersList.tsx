interface CharactersListProps {
  photoObjects: {
    id: number;
    name: string;
    image_url: string;
  }[];
  foundPhotoObjectIds: Set<number>;
}

export default function CharactersList({
  photoObjects,
  foundPhotoObjectIds,
}: CharactersListProps) {
  const missingObjectsCount = photoObjects.length - foundPhotoObjectIds.size;

  const photoObjectList = photoObjects.map((photoObject) => {
    return (
      <li
        key={photoObject.id}
        className="flex flex-row items-center gap-x-2 max-w-fit relative"
      >
        <div className="w-12 h-12 overflow-hidden bg-gray-200 flex flex-col justify-center rounded-2xl">
          <img
            src={photoObject.image_url}
            alt={`A photo of the character ${photoObject.name}`}
            className="max-w-full max-h-full object-contain object-top mx-auto"
          />
        </div>
        <span className="text-xl">{photoObject.name}</span>
        <span
          className={`absolute h-1 w-full bg-red-800 ${
            foundPhotoObjectIds.has(photoObject.id) ? "visible" : "invisible"
          }`}
        ></span>
      </li>
    );
  });

  return (
    <div className="mb-4">
      <h2 className="text-2xl mb-4">
        {`${missingObjectsCount}\n`}
        Missing Character{missingObjectsCount === 1 ? "" : "s"}:
      </h2>
      <ul className="flex flex-col gap-y-3">{photoObjectList}</ul>
    </div>
  );
}
