import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Navbar.css";

const cookies = new Cookies();


function Navbar(props){
    const usuarioEnSesion = cookies.get("user-auth-cookie");
    function logout(){
        cookies.remove("user-auth-cookie");
        props.history.push("/");
    }
    if (usuarioEnSesion !== undefined)
    {
        return(
        <nav>
            <h1>Movie App</h1>
            <ul className="elemento_menu">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Series">Series</Link>
                </li>
                <li>
                    <Link to="/PeliculasPopulares">Películas Populares</Link>
                </li>
                <li>
                    <Link to="/PeliculasCartelera">Películas en Cartelera</Link>
                </li>
                <li>
                    <Link to="/Favoritos">Favoritos</Link>
                </li>
                <li>
                    <button onClick={() => logout()}>Cerrar sesión</button>
                </li>
            </ul>
        </nav>
    )
    } else {
        return (
             <nav>
                <h1>Movie App</h1>
                <ul className="elemento_menu" >
                    <li >
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Series">Series</Link>
                    </li>
                    <li>
                        <Link to="/PeliculasPopulares">Películas Populares</Link>
                    </li>
                    <li>
                        <Link to="/PeliculasCartelera">Películas en Cartelera</Link>
                    </li>
                    <li>
                        <Link to="/register">Crear Cuenta</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(Navbar);