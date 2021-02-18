import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logoutSuccess } from '../redux/actions/authActions'


const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch(logoutSuccess())
    history.push("/");
  }


  const displayMenu = () => {
    if (isAuthenticated) {
      return (
        <nav className="row">
            <Link className="nav-link" to="/"> Accueil </Link>
           <Link className="nav-link" to="/profile"> Profil </Link>
           <p className="nav-link logout" onClick={logout}>Se déconnecter</p>
        </nav>
      )
    } else {
      return (
        <nav className="row">
          <Link className="nav-link" to="/"> Accueil </Link>
          <Link className="nav-link" to="/login"> Se connecter </Link>
         <Link className="nav-link" to="/register"> S'inscrire </Link>
        </nav>
      )
    }
  }

  return displayMenu();
};

export default Navbar;