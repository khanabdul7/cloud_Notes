import React, {useContext} from 'react';
import NoteContext from '../context/Notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
    return (
        <div className='my-3 row'>
            <h2 >Your Note</h2>
            {notes.map((note) => { return <NoteItem notes={note} />})}
        </div>
    )
}

export default Notes