import React, { useState, useEffect } from "react";
import Card from "../../componentes/Card/Card";
import "./PeliculasPopulares.css";
import Filtro from "../../componentes/Filtro/Filtro";

function PeliculasPopulares(props){
    const [peliculas, setPeliculas] = useState([]);
    const [peliculasFiltradas, setPeliculasFiltradas] = useState([]);
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=e7925d2a271ab3943d2cc21147be472b")
        .then(response => response.json())
        .then(data => {
            setPeliculas(data.results);
            setPeliculasFiltradas(data.results);
        })
        .catch(error => console.log(error));
    }, []);

    function masPeliculas(){
        let paginaSiguiente = pagina + 1;
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e7925d2a271ab3943d2cc21147be472b&page=${paginaSiguiente}`)
            .then(response => response.json())
            .then(data => {
                const todasLasPeliculas = peliculas.concat(data.results);
                setPeliculas(todasLasPeliculas);
                setPeliculasFiltradas(todasLasPeliculas);
                setPagina(paginaSiguiente);
            })
            .catch(error => console.log(error));
    }

    function filtrarPeliculas(input) {
        const filtradas = peliculas.filter(
            (pelicula) =>
                pelicula.title
                    .toLowerCase()
                    .includes(input.toLowerCase())
        );
        setPeliculasFiltradas(filtradas);
    }

    return(
        <React.Fragment>
            <h1>Peliculas Populares</h1>
            <Filtro filtrarContenido={(texto) => filtrarPeliculas(texto)}/>
            {
                peliculas.length === 0 ?
                <h3>Cargando...</h3>
                :
                <section className="cards">
                    {
                        peliculasFiltradas.map((pelicula, idx) =>
                            <Card
                                key={idx}
                                contenido={pelicula}
                                tipo="movie"
                            />
                        )
                    }
                </section>
            }
            <button onClick={() => masPeliculas()}>
                Más películas
            </button>
        </React.Fragment>
    );
}

export default PeliculasPopulares;
