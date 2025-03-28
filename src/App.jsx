import "./App.css";
import { tracks } from "./utils/tracks";
import { TrackList } from "./components/Tracklist/TrackList";

function App() {
  return (
    <>
      {tracks.map((track, i) => (
        <TrackList key={i} {...track} />
      ))}
    </>
  );
}

export default App;
