import React from "react";
import { Button } from "../UI/Button/Button";

const TrackList = ({ track, setPlaylist }) => {
  const handleAddTrackToPlaylist = () => {
    setPlaylist((prev) => {
      const exists = prev.some((t) => t.id === track.id);
      if (exists) {
        alert("YA EXISTE");
        return prev;
      }
      return [...prev, track];
    });
  };

  return (
    <>
      <div className="track-item--container" style={{ marginBottom: "1rem" }}>
        <div className="track_item--text">
          <b>{track.name}</b>
          <span style={{ fontSize: "14px", display: "block" }}>
            {track.artist} | {track.album}
          </span>
        </div>
        <div
          className="track_item--button"
          style={{ marginTop: "1rem", fontSize: "12px" }}
        >
          <Button text="Add to Playlist" onClick={handleAddTrackToPlaylist} />
        </div>
      </div>
    </>
  );
};

export { TrackList };
