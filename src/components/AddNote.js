import React, {useContext, useState} from 'react'
import NoteContext from '../context/Notes/NoteContext'

const AddNote = (props) => {

    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})    

const handleChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value}) //1st arg says the properties inside note will remain as-it-is, and overwrite 2nd arg i.e: trgt.name (ex. title) with its value trgt.value (ex. 'my title')
}

const handleClick = (e) => {
    e.preventDefault(); //prevent page from reloading
    console.log("note added")
    addNote(note);
    setNote({title: "", description: "", tag: ""})
    props.showAlert("Note Added","success")
}

    return (
        <div className='container my-3'>
            <h2>Add a Note</h2>
            <form className='my-2' onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title*</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value={note.title} placeholder='Enter Title' required minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description*</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handleChange} value={note.description} placeholder='Enter Description' required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} value={note.tag} placeholder='Enter Tag (Optional)'/>
                </div>
                <button type="submit" className="btn btn-primary" >Add Note</button>
            </form>
        </div>
    )
}

export default AddNote