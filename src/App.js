import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/Notes/NoteState";


const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "about",
          element: <About />
        }
      ]
    },
  ])

  return (
    <>
    <NoteState>
        <RouterProvider router={router} />
    </NoteState>
    </>
  );
}

export default App;
