import React, { useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext';

const NoteItem = (props) => {
    const { title, description, tag, _id } = props.notes;
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{tag}</p>
                    <div className='d-flex'>
                    <i className="fa-solid fa-file-pen mx-2"></i>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(_id)}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem