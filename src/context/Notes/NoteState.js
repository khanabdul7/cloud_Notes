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
          'auth-token': localStorage.getItem('token')
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
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(note)
      });
      const data = await response.json();
      console.log(data)

      //client side logic
      fetchAllNote();
    }

    //Edit Note
    const editNote = async (id, title, description, tag) =>{
      //API call
      const response = await fetch (`${host}api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const data = await response.json();
      console.log("response from edit: ", data)
      fetchAllNote();
     
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
          'auth-token': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      console.log("response from edit: ", data)
    }
   
    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, fetchAllNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;