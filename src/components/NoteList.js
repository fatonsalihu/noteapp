import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import Note from "./Note";

function NoteList() {
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
      {notes.map((note) => (
        <Note key={note.uidd} note={note} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default NoteList;
