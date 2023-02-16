import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase.js";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";
import { AuthContext } from "../context/Auth.js";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import BuildEditor from "./BuildEditor.js";

function AddNote() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const location = useLocation();
  const [editable, setEditable] = useState(location.state.edit);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  useEffect(() => {
    if (editable === true) {
      setTitle(location.state.title);
      const content = location.state.content;
      const contentState = convertFromRaw(JSON.parse(content));
      setEditorState(() => EditorState.createWithContent(contentState));
    }
  }, []);

  const writeToDatabase = () => {
    const contentState = editorState.getCurrentContent();
    const content = JSON.stringify(convertToRaw(contentState));

    const uidd = uid();
    if (editable === false) {
      set(ref(db, `/${currentUser.uid}/${uidd}`), {
        title: title,
        content: content,
        uidd: uidd,
      });
    } else if (editable === true) {
      update(ref(db, `/${currentUser.uid}/${location.state.uidd}`), {
        title: title,
        content: content,
        uidd: location.state.uidd,
      });
    }
    setTitle("");
    setEditorState(() => EditorState.createEmpty());
    navigate("/home");
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
          <div className="flex justify-end py-3">
            <button
              onClick={() => navigate("/home")}
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              Close
            </button>
            <button
              onClick={writeToDatabase}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {editable ? "Edit Note" : "Add Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
