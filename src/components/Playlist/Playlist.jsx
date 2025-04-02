import React from "react";
import { Button } from "../UI/Button/Button";

const PlayList = ({ playlist }) => {
  return (
    <>
      <div>
        {playlist.length > 0 ? (
          playlist.map((item, i) => {
            const { name, artist, album } = item;
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
