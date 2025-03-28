import "./App.css";
import { tracks } from "./utils/tracks";
import { playlists } from "./utils/playlists";
import { TrackList } from "./components/Tracklist/TrackList";
import { PlayList } from "./components/Playlist/PlayList";

function App() {
  return (
    <>
      <h1>TrackList</h1>
      {tracks.map((track, i) => (
        <TrackList key={i} {...track} />
      ))}

      <h1>PlayLists</h1>
      {playlists.map((playlist, i) => (
        <PlayList key={i} {...playlist} />
      ))}
    </>
  );
}

export default App;
