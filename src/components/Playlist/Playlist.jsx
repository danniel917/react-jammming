import React, { useState, useEffect } from "react";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";

const PlayList = ({ playlist, setPlaylist }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistsSaved, setPlaylistsSaved] = useState([]);

  const handleRemoveTrackToPlaylist = (trackId) => {
    setPlaylist(() => {
      const newPlaylist = playlist.filter((item) => item.id !== trackId);
      return newPlaylist;
    });
  };

  const handleSavePlaylist = () => {
    if (playlistName.length === 0) {
      alert("Add a name to your playlist");
      return;
    }

    setPlaylistsSaved((prev) => [
      { name: playlistName, tracks: playlist },
      ...prev,
    ]);

    setPlaylist([]);
  };

  useEffect(() => {
    if (playlist.length === 0) {
      setPlaylistName("");
    }
  }, [playlist]);

  return (
    <>
      <div>
        {playlist.length > 0 ? (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <Input
                type="text"
                name="playlistName"
                id="playlistName"
                value={playlistName}
                placeholder="Add your playlist name"
                onChange={(e) => {
                  setPlaylistName(e.target.value);
                }}
                style={{
                  width: "100%",
                  backgroundColor: "#00000075",
                  borderRadius: "1rem",
                  padding: "1rem",
                  color: "#ffffff",
                }}
              />
            </div>

            {playlist.map((track, i) => {
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
                      onClick={() => handleRemoveTrackToPlaylist(track.id)}
                    />
                  </div>
                </div>
              );
            })}
            <Button
              text="Save to Spotify"
              style={{
                backgroundColor: "#1DB954",
                color: "#ffffff",
              }}
              onClick={handleSavePlaylist}
            />
          </>
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
        {playlistsSaved &&
          playlistsSaved.length > 0 &&
          playlistsSaved.map((p, i) => {
            const { name, tracks } = p;
            return (
              <div
                key={i}
                style={{
                  border: "1px solid gray",
                  padding: "2rem 2rem 0",
                  borderRadius: "25px",
                  marginBottom: "2rem",
                }}
              >
                <p>Playlist Name:</p>
                <h3 style={{ marginBottom: "1rem" }}>{name}</h3>
                <p>Track List:</p>
                <div style={{ marginBottom: "2rem" }}>
                  {tracks.map((track, i) => {
                    const { name, artist, album } = track;
                    return (
                      <div
                        key={i}
                        className="track_item--text"
                        style={{
                          borderBottom: "1px solid #ffffff15",
                          paddingBlock: "1rem",
                        }}
                      >
                        <b>{name && name}</b>
                        <span style={{ fontSize: "14px", display: "block" }}>
                          {artist && album
                            ? `${artist} | ${album}`
                            : artist || album}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export { PlayList };
