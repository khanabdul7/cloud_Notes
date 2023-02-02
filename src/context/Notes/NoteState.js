import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = 'http://localhost:5000/'

    const [notes, setNotes] = useState([])

      //Fetch All Notes
    const fetchAllNote = async () => {
      //API call
      const response = await fetch (`${host}api/notes/getallnotes`, {
        method: 'GET',
        headers: {
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMjAxZDc4ZjlmNGRiMTc2NTY3ZGFkIn0sImlhdCI6MTY3NDcwNzQxNX0.F-QgxeJWk3TxP6R7-tNw-_TowgOwNolv6qbv6R1UjDQ'
        },
      });
      const fetchedNotes = await response.json();
      console.log(fetchedNotes)
      setNotes(fetchedNotes)
    }

    //Add Note
    const addNote = async (note) => {
      //API call
      const response = await fetch (`${host}api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMjAxZDc4ZjlmNGRiMTc2NTY3ZGFkIn0sImlhdCI6MTY3NDcwNzQxNX0.F-QgxeJWk3TxP6R7-tNw-_TowgOwNolv6qbv6R1UjDQ'
        },
        body: JSON.stringify(note)
      });
      const data = await response.json();

      //client side logic
      fetchAllNote();
    }

    //Edit Note
    const editNote = async (id, title, description, tag) =>{
      //API call
      const response = await fetch (`${host}api/notes/updatenote/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMjAxZDc4ZjlmNGRiMTc2NTY3ZGFkIn0sImlhdCI6MTY3NDcwNzQxNX0.F-QgxeJWk3TxP6R7-tNw-_TowgOwNolv6qbv6R1UjDQ'
        },
        body: JSON.stringify(title, description, tag)
      });
      const data = await response.json();

      //Logic to edit in client side
      for(let i=0; i<notes.length; i++){
        const element = notes[i];
        if (element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
    }

    //Delete Note
    const deleteNote = async (id) =>{
      console.log("Deleting note with id: ", id);
      //client side logic
      const newNotes = notes.filter((note)=> { return note._id !== id});
      setNotes(newNotes);
      //TODO: API Call
      const response = await fetch (`${host}api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMjAxZDc4ZjlmNGRiMTc2NTY3ZGFkIn0sImlhdCI6MTY3NDcwNzQxNX0.F-QgxeJWk3TxP6R7-tNw-_TowgOwNolv6qbv6R1UjDQ'
        }
      });
    }
   
    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, fetchAllNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;