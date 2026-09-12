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
                    <Link to="/Listado">Listado</Link>
                </li>

                <li>
                    <Link to="/Favoritos">Favoritos</Link>
                </li>

            </ul>

        </nav>

    )

}

export default Navbar;