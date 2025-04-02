import { React, useState } from "react";
import { Button } from "../UI/Button/Button";

const SearchBar = ({ setTracklist }) => {
  const [search, setSearch] = useState("");

  const handleTracklistResults = () => {
    let newTracklist;
    setTracklist(newTracklist);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          placeholder="Search"
          onChange={({ target }) => setSearch(target.value)}
        />
        <Button text="Search" onClick={handleTracklistResults} />
      </div>
    </>
  );
};

export { SearchBar };
