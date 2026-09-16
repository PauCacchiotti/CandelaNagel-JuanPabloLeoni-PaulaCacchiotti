import React, { Component } from "react";
import Card from "../../componentes/Card/Card";
import "./PeliculasPopulares.css";
import Filtro from "../../componentes/Filtro/Filtro";

class PeliculasPopulares extends Component{
    constructor(props){
        super(props);
        this.state = {
            peliculas:[],
            peliculasFiltradas:[],
            pagina:1
        };
    }
    componentDidMount(){
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=e7925d2a271ab3943d2cc21147be472b")
        .then(response => response.json())
        .then(data => this.setState({
            peliculas: data.results,
            peliculasFiltradas: data.results
        }))
        .catch(error => console.log(error));
    }
    masPeliculas(){
        let paginaSiguiente = this.state.pagina + 1;
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e7925d2a271ab3943d2cc21147be472b&page=${paginaSiguiente}`)
            .then(response => response.json())
            .then(data => {
                const todasLasPeliculas = this.state.peliculas.concat(data.results);
                this.setState({
                    peliculas: todasLasPeliculas,
                    peliculasFiltradas: todasLasPeliculas,
                    pagina: paginaSiguiente
                });
            })
            .catch(error => console.log(error));
    }
    filtrarPeliculas(input) {
        const peliculasFiltradas = this.state.peliculas.filter(
            (pelicula) =>
                pelicula.title
                    .toLowerCase()
                    .includes(input.toLowerCase())
        );
        this.setState({
            peliculasFiltradas: peliculasFiltradas
        });
    }
    render(){
        return(
            <>
                <h1>Peliculas Populares</h1>
                <Filtro filtrarContenido={(texto) => this.filtrarPeliculas(texto)}/>
                <section className="cards">
                    {
                    this.state.peliculasFiltradas.map((pelicula, idx) => 
                        <Card key={idx} contenido={pelicula} tipo="movie" />)
                    }
                </section>
                <button onClick={() => this.masPeliculas()}>
                    Más películas
                </button>
            </>
        );
    }
}

export default PeliculasPopulares;