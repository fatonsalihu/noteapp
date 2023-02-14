import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase.js";
import { uid } from "uid";
import { set, ref } from "firebase/database";
import { AuthContext } from "../context/Auth.js";
import { EditorState, convertToRaw } from "draft-js";
import BuildEditor from "./BuildEditor.js";

function AddNote() {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const contentState = editorState.getCurrentContent();
  const content = JSON.stringify(convertToRaw(contentState));

  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${currentUser.uid}/${uidd}`), {
      title: title,
      content: content,
      uidd: uidd,
    });

    setTitle("");
    setEditorState(() => EditorState.createEmpty());
  };

  return (
    <div>
      <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none">
        <div className="w-96 px-5 pt-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <input
            type="search"
            id="default-search"
            className="block w-80 m-2 p-2 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add title"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <div>
            <BuildEditor
              editorState={editorState}
              setEditorState={setEditorState}
            />
          </div>
          <br />
          <div className="flex justify-end">
            <Link to="/home">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Close
              </button>
            </Link>
            <Link to="/home">
              <button
                onClick={writeToDatabase}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Note
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
