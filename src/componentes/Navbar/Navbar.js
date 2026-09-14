import React from "react";
import { Link } from "react-router-dom";

function Navbar(){

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

export default Navbar;