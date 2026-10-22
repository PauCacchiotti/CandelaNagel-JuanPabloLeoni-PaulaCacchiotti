import React, { Component } from "react";
import React, {useState, useEffect} from "react";
import Card from "../../componentes/Card/Card";
import "./PeliculasCartelera.css";
import Filtro from "../../componentes/Filtro/Filtro";

function PeliculasCartelera(props){

     const [peliculas, setPeliculas] = useState([]);
     const [peliculasFiltradas, setPeliculasFiltradas] = useState([]);
     const [pagina, setPagina] = useState(1);

     useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=e7925d2a271ab3943d2cc21147be472b")
            .then(response => response.json())
            .then(data => {
                setPeliculas(data.results);
                setPeliculasFiltradas(data.results);
            })
            .catch(error => console.log(error));
    }, []);

    function masPeliculas(){
        let paginaSiguiente = pagina + 1;

        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=e7925d2a271ab3943d2cc21147be472b&page=${paginaSiguiente}`)
            .then(response => response.json())
            .then(data => {
                let todasLasPeliculas = [];
                 for(let i = 0; i < peliculas.length; i++){
                    todasLasPeliculas.push(peliculas[i]);
                }

                 for(let i = 0; i < data.results.length; i++){
                todasLasPeliculas.push(data.results[i]);
             }

                setPeliculas(todasLasPeliculas);
                setPeliculasFiltradas(todasLasPeliculas);
                setPagina(paginaSiguiente);
            })
            .catch(error => console.log(error));
            }         
  
    function filtrarPeliculas(input) {
    const filtradas = peliculas.filter(
        pelicula => pelicula.title.toLowerCase() === input.toLowerCase()
       );
       setPeliculasFiltradas(filtradas);
    
    }

        return(
            <React.Fragment>
                <h1>Peliculas en cartelera</h1>
                <Filtro filtrarContenido={(texto) => this.filtrarPeliculas(texto)}/>
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
                <button onClick={() => this.masPeliculas()}>
                    Más películas
                </button>
            </React.Fragment>
        );
    
    }

export default PeliculasCartelera;