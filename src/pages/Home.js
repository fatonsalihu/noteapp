import React, { useState } from "react";
import Search from "../components/Search";
import { useNavigate, Outlet } from "react-router-dom";
import NoteList from "../components/NoteList";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = (word) => {
    setSearch(word);
  };
  return (
    <div className="">
      <div className="mt-7 mx-1 md:mx-6 lg:mx-10 ">
        <div className="flex flex-row justify-between">
          <button
            type="button"
            onClick={() => {
              navigate("addnote", { state: { edit: false } });
            }}
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            AddNote
          </button>
          <Search handleSearch={handleSearch} />
        </div>
        <div className="mt-5">
          <NoteList search={search} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
