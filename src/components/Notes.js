import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/Notes/NoteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, fetchAllNote, editNote } = context;
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem("token")){ //If User is logged in
            fetchAllNote();
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    const capitalize = (word) => {
          let lower = word.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1); 
      }

    const ref = useRef(null) //useRef hook is used to give references
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (CurrentNote) => {
        console.log("updating a note with id: ", CurrentNote._id)
        ref.current.click(); //calling modal for editing note.
        setNote({ id: CurrentNote._id, etitle: CurrentNote.title, edescription: CurrentNote.description, etag: CurrentNote.tag })
    }


    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) //1st arg says the properties inside note will remain as-it-is, and overwrite 2nd arg i.e: trgt.name (ex. title) with its value trgt.value (ex. 'my title')
    }

    const handleClick = () => {
        console.log("Updating note: ", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click(); //Closing modal after clicking in close button.
        props.showAlert("Note Updated","info")
    }

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-2'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title*</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={handleChange} value={note.etitle} placeholder='Enter Title' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description*</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={handleChange} value={note.edescription} placeholder='Enter Description' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={handleChange} value={note.etag} placeholder='Enter Tag (Optional)' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-3 row'>
                <h2 >{capitalize(localStorage.getItem("name"))} Notes</h2>
                <div className='container'>
                    {notes.length === 0 && 'Please add a note to display here'}
                </div>
                {notes.map((note) => { return <NoteItem key={note._id} updatenotes={updateNote} notes={note} showAlert={props.showAlert} /> })}
            </div>
        </>
    )
}

export default Notes