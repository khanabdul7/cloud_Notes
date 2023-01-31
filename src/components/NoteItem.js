import React from 'react'

const NoteItem = (props) => {
    const { title, description, tag } = props.notes;
    
    return (
        <div className='container col-md-3 my-3'>
            <div className="card ">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{tag}</p>
                    <div className='d-flex'>
                    <i className="fa-solid fa-file-pen mx-2"></i>
                    <i className="fa-solid fa-trash mx-2"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem