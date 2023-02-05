import React, {useEffect} from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Alert from './Alert';

function Navbar(props) {

    const {alerts} = props;
    let navigate = useNavigate();

    let location = useLocation();
    useEffect(() => {
      
    }, [location])

    const handleLogout = ()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={`/`}>Cloud Notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/"? "active": ""}`} aria-current="page" to={``}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} to={`about`}>About</Link>
                            </li>
                        </ul>
                        { !localStorage.getItem("token") ? <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to={'login'}>Login</Link>
                            <Link className="btn btn-primary mx-1" to={'signup'}>Signup</Link>
                        </form> : <button className="btn btn-primary mx-1" onClick={handleLogout}>logout</button>}
                    </div>
                </div>
            </nav>
            <Alert alert={alerts}/>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Navbar