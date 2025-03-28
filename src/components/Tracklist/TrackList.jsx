import React from "react";

const TrackList = ({ name, artist, album }) => {
  return (
    <>
      <div>
        <h2>{name}</h2>
        <p>{artist}</p>
        <p>{album}</p>
      </div>
    </>
  );
};

export { TrackList };
