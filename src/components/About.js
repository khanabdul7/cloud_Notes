import React, { useContext, useEffect } from 'react';
import NoteContext from '../context/Notes/NoteContext';

const About = () => {
    const c = useContext(NoteContext);

    useEffect(() => {
      c.update();
      // eslint-disable-next-line
    }, [])
    
  return (
    <div>This is About {c.state.name} and he works in {c.state.company}</div>
  )
}

export default About