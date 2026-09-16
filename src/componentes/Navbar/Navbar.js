import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();


function Navbar(){

    const usuarioEnSesion = cookies.get("user-auth-cookie");

    if (usuarioEnSesion !== undefined)
    {
        return(

        <nav>
            
            <h1>Movie App</h1>

            <ul>

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

            </ul>

        </nav>

    )

    } else {
        return (

             <nav>

                <h1>Movie App</h1>

                <ul>

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