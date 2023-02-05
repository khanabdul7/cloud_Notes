import AddNote from "./AddNote"
import Notes from "./Notes"

const Home = (props) => {
  return (
    <div className='container my-3'>
      <AddNote showAlert={props.showAlert} />
      <Notes showAlert={props.showAlert} />
    </div>
  )
}

export default Home