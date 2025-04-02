import "./App.css";
import { tracks } from "./utils/tracks";
import { useState } from "react";
import { TrackList } from "./components/Tracklist/TrackList";
import { PlayList } from "./components/Playlist/PlayList";
import { SearchBar } from "./components/SearchBar/SearchBar";

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [tracklist, setTracklist] = useState(tracks);

  return (
    <>
      <SearchBar setTracklist={setTracklist} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#00000075",
            padding: "2rem",
            borderRadius: "1rem",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Results</h2>
          {tracklist.map((track, i) => (
            <TrackList key={i} track={track} setPlaylist={setPlaylist} />
          ))}
        </div>
        <div
          style={{
            backgroundColor: "#0d0d0d50",
            padding: "2rem",
            borderRadius: "1rem",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Playlists</h2>
          <PlayList playlist={playlist} />
        </div>
      </div>
    </>
  );
}

export default App;
