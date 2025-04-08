import React from "react";
import { Button } from "../UI/Button/Button";

const PlayList = ({ playlist, setPlaylist }) => {
  const handleRemoveTrackToPlaylist = (trackId) => {
    setPlaylist(() => {
      const newPlaylist = playlist.filter((item) => item.id !== trackId);
      return newPlaylist;
    });
  };

  return (
    <>
      <div>
        {playlist.length > 0 ? (
          playlist.map((track, i) => {
            const { name, artist, album } = track;
            return (
              <div
                key={i}
                className="track_item--text"
                style={{
                  marginBottom: "2rem",
                  borderBottom: "1px solid #ffffff15",
                  paddingBottom: "1rem",
                }}
              >
                <b>{name && name}</b>
                <span style={{ fontSize: "14px", display: "block" }}>
                  {artist && album ? `${artist} | ${album}` : artist || album}
                </span>
                <div
                  className="track_item--button"
                  style={{ marginTop: "1rem", fontSize: "12px" }}
                >
                  <Button
                    text="Remove from Playlist"
                    onClick={()=>handleRemoveTrackToPlaylist(track.id)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p
            style={{
              fontSize: "14px",
              marginBottom: "2rem",
            }}
          >
            Add items to your playlist
          </p>
        )}
      </div>
      <Button text="Save to Spotify" />
    </>
  );
};

export { PlayList };
