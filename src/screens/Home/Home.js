import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../componentes/Card/Card";
import SearchForm from "../../componentes/SearchForm/SearchForm";
import "./Home.css";

function Home(){
    const [peliculasPopulares, setPeliculasPopulares] = useState([]);
    const [peliculasCartelera, setPeliculasCartelera] = useState([]);
    const [cargandoPopulares, setCargandoPopulares] = useState(true);
    const [cargandoCartelera, setCargandoCartelera] = useState(true);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=e7925d2a271ab3943d2cc21147be472b")
        .then(response => response.json())
        .then(data => {
                setPeliculasPopulares(data.results);
                setCargandoPopulares(false);
        })
        .catch(error => console.log(error))
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=e7925d2a271ab3943d2cc21147be472b")
        .then(response => response.json())
        .then(data => {
            setPeliculasCartelera(data.results);
            setCargandoCartelera(false);
        })
        .catch(error => console.log(error))
    }, [])
    console.log(peliculasPopulares)
    return(
        <div>
            <h2>Bienvenidos</h2>
            <SearchForm />
            <h2>Películas Populares</h2>
            <Link to="/PeliculasPopulares">Ver todas</Link>
            {
                cargandoPopulares === true ?
                <h3>Cargando...</h3>
                :
                <section className="cards">
                    {
                        peliculasPopulares.map((pelicula, idx) =>
                            <Card
                                key={idx}
                                contenido={pelicula}
                                tipo="movie"
                            />
                        )
                    }
                </section>
            }
            <h2>Películas Cartelera</h2>
            <Link to="/PeliculasCartelera">Ver todas</Link>
            {
                cargandoCartelera === true ?
                <h3>Cargando...</h3>
                :
                <section className="cards">
                    {
                        peliculasCartelera.map((pelicula, idx) =>
                            <Card
                                key={idx}
                                contenido={pelicula}
                                tipo="movie"
                            />
                        )
                    }
                </section>
            }
        </div>
    )
}

export default Home