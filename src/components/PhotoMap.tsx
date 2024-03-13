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
}

export function PhotoMap({ photo, photoObjects }: PhotoMapProps) {
  const targetList = photoObjects.map((photoObject) => {
    return (
      <li key={photoObject.id} className="">
        <button className="bg-gray-200 w-full rounded-2xl py-0.5 px-4 text-xl">
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
        className="absolute w-10 h-10 opacity-0 border-4 border-gray-800"
        style={{
          top: "246px",
          left: "448px",
          opacity: 1,
        }}
      ></span>
      <img
        src={photo.image_url}
        alt="A photo of the Where's Waldo map"
        id="image"
        className="absolute top-0 left-0 opacity-0 cursor-crosshair"
      ></img>
      <ul
        id="target-box-options"
        className="absolute flex flex-col gap-y-0.5 invisible"
        style={{
          top: "278px",
          left: "385px",
          visibility: "visible",
        }}
      >
        {targetList}
      </ul>
    </div>
  );
}
