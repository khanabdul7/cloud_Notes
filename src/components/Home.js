import AddNote from "./AddNote"
import Notes from "./Notes"

const Home = () => {
  return (
    <div className='container my-3'>
      <AddNote />
      <Notes />
    </div>
  )
}

export default Home