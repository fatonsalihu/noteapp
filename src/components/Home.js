import React, { useState } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import NoteList from "./NoteList";

function Home() {
  const [search, setSearch] = useState("");

  const handleSearch = (word) => {
    setSearch(word);
  };
  return (
    <div className="mt-7 mx-1 md:mx-6 lg:mx-10">
      <div className="flex flex-row justify-between">
        <Link to="/addnote" state={{ edit: false }}>
          <button
            type="button"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            AddNote
          </button>
        </Link>

        <Search handleSearch={handleSearch} />
      </div>
      <div className="mt-5">
        <NoteList search={search} />
      </div>
    </div>
  );
}

export default Home;
