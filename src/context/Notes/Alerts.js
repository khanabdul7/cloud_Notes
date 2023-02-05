import AlertContext from "../AlertContext";
import { useState } from "react";

const Alerts = (props)=>{

    const [alert, setAlert] = useState({msg: "", type: ""});

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

  return(
    <AlertContext.Provider value={{alert, showAlert}}>
        {props.children}
    </AlertContext.Provider>
  )

}


export default Alerts;