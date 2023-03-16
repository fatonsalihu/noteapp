import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { ref, onValue, remove } from "firebase/database";
import Note from "./Note";

function NoteList({ search }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoading(true);
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setNotes([]);

          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((note) => {
              setNotes((oldArray) => [...oldArray, note]);
            });
          }
          setLoading(false);
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  console.log(loading);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-3">
      {notes
        .filter((note) => {
          return (
            note.title.toLowerCase().includes(search) ||
            JSON.parse(note.content)
              .blocks[0].text.toLowerCase()
              .includes(search)
          );
        })
        .map((note) => (
          <Note key={note.uidd} note={note} onDelete={handleDelete} />
        ))}
      {notes.length === 0 && !loading && (
        <p className="text-white">No notes avaiable</p>
      )}
      {loading && <p className="text-white">Loading</p>}
    </div>
  );
}

export default NoteList;
