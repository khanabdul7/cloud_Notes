import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {

    const note = [
        {
          "_id": "63d25f35f35b58feacde5c24",
          "user": "63d201d78f9f4db176567dad",
          "title": "My First Note ",
          "description": "description section of note",
          "tag": "General",
          "Date": "2023-01-26T11:08:37.781Z",
          "__v": 0
        },
        {
          "_id": "63d7dfbd98a61ce10df14047",
          "user": "63d201d78f9f4db176567dad",
          "title": "My First Note temp",
          "description": "description section of note",
          "tag": "General",
          "Date": "2023-01-30T15:18:21.383Z",
          "__v": 0
        },
        {
          "_id": "63d7dfbd98a61ce10df14047",
          "user": "63d201d78f9f4db176567dad",
          "title": "My First Note temp",
          "description": "description section of note",
          "tag": "General",
          "Date": "2023-01-30T15:18:21.383Z",
          "__v": 0
        },
        {
          "_id": "63d7dfbd98a61ce10df14047",
          "user": "63d201d78f9f4db176567dad",
          "title": "My First Note temp",
          "description": "description section of note",
          "tag": "General",
          "Date": "2023-01-30T15:18:21.383Z",
          "__v": 0
        },
        {
          "_id": "63d7dfbd98a61ce10df14047",
          "user": "63d201d78f9f4db176567dad",
          "title": "My First Note temp",
          "description": "description section of note",
          "tag": "General",
          "Date": "2023-01-30T15:18:21.383Z",
          "__v": 0
        },
        {
          "_id": "63d7dfbd98a61ce10df14047",
          "user": "63d201d78f9f4db176567dad",
          "title": "My First Note temp",
          "description": "description section of note",
          "tag": "General",
          "Date": "2023-01-30T15:18:21.383Z",
          "__v": 0
        },
        {
          "_id": "63d7dfbd98a61ce10df14047",
          "user": "63d201d78f9f4db176567dad",
          "title": "My First Note temp",
          "description": "description section of note",
          "tag": "General",
          "Date": "2023-01-30T15:18:21.383Z",
          "__v": 0
        },
        {
          "_id": "63d7dfbd98a61ce10df14047",
          "user": "63d201d78f9f4db176567dad",
          "title": "My First Note temp",
          "description": "description section of note",
          "tag": "General",
          "Date": "2023-01-30T15:18:21.383Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(note)

    //Add Note
    const addNote = (title, description, tag) => {
      setNotes(notes.concat({
        "_id": "63d7dfbd98a61ce10df14047",
        "user": "63d201d78f9f4db176567dad",
        "title": title,
        "description": description,
        "tag": tag,
        "Date": "2023-01-30T15:18:21.383Z",
        "__v": 0
      }))
    }

    //Edit Note
    const editNote = () =>{

    }

    //Delete Note
    const deleteNote = () =>{
      
    }
   
    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;