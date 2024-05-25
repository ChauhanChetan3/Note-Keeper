import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    const allNotes = readFromStorage();
    setNotes(allNotes);
  },[])

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    saveToStorage(newNote);
  }

  function readFromStorage(){
   const str =  localStorage.getItem("notes");
   const notes = JSON.parse(str);
   if (!notes) return [] ;
   else
   return notes;
  }

  function saveToStorage(note){
    const notes = readFromStorage();
    const allNotes = [...notes, note];
    const str = JSON.stringify(allNotes);
    localStorage.setItem("notes", str);
  }

  function deleteFromStorage(id){
    const notes = readFromStorage();
    const allNotes = notes.filter((_, index)=> index !== id );
    const str = JSON.stringify(allNotes);
    localStorage.setItem("notes", str);
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    deleteFromStorage(id);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      
    </div>
  );
}

export default App;
