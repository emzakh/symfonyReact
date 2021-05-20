import React from 'react';
import {NavLink} from "react-router-dom"
import authAPI from "../services/authAPI"

const Navbar = (props) => {

    const handleLogout = () => {
        authAPI.logout()
        props.onLogout(false)
        props.history.push("/login")
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Api-Platform React</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Clients</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {(!props.isAuthenticated)? (
                        <>
                       <li className="nav-item">
                        <NavLink to="#" className="nav-link">Inscription</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
                    </li>
                        </>

                    ) : ( 
                        <li className="nav-item">
                        <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                        </li>
                    )}

              
                </ul>
            </div>
        </nav> 
     );
}
 
export default Navbar;