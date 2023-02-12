import React from "react";

function Note({ note, onDelete }) {
  return (
    <div className="w-96 h-80 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {note.title}
      </h5>

      <div className="text-gray-300">
        <p>{note.content}</p>
      </div>
      <button className="bg-red-700">Edit</button>
      <span></span>
      <button onClick={() => onDelete(note.uidd)} className="bg-red-700">
        Delete
      </button>
    </div>
  );
}

export default Note;
