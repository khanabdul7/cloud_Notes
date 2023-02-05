import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import NoteState from "./context/Notes/NoteState";
import { useState } from "react";


const App = () => {


  const [alert, setAlert] = useState(null);

  //for showing alerts
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar alerts={alert} />,
      children: [
        {
          path: "",
          element: <Home showAlert={showAlert} />
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "login",
          element: <Login showAlert={showAlert} />
        },
        {
          path: "signup",
          element: <Signup showAlert={showAlert} />
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
