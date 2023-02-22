import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase.js";
import { useNavigate, useLocation } from "react-router-dom";
import { ref, onValue, remove } from "firebase/database";
import Note from "./Note";

function NoteList({ search }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setNotes([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((note) => {
              setNotes((oldArray) => [...oldArray, note]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(384px,1fr))] gap-3">
      {notes
        .filter((note) => {
          return (
            note.title.toLowerCase().includes(search) ||
            note.content.toLowerCase().includes(search)
          );
        })
        .map((note) => (
          <Note key={note.uidd} note={note} onDelete={handleDelete} />
        ))}
      {notes.length === 0 && <p className="text-white">No notes avaiable</p>}
    </div>
  );
}

export default NoteList;
