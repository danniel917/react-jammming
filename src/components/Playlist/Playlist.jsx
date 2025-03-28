import React from "react";

const PlayList = ({ name, tracks }) => {
  return (
    <>
      <div>
        <h2>{name}</h2>
        <div>
          {tracks.map((track, i) => (
            <ul key={i}>
              <li> {track.name}</li>
              <li> {track.artist}</li>
              <li> {track.album}</li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export { PlayList };
