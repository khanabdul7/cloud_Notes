import React, {useContext, useEffect} from 'react';
import NoteContext from '../context/Notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes, fetchAllNote} = context;

    useEffect(() => {
        fetchAllNote();
    }, [])
    
    return (
        <div className='my-3 row'>
            <h2 >Your Notes</h2>
            {notes.map((note) => { return <NoteItem key={note._id} notes={note} />})}
        </div>
    )
}

export default Notes