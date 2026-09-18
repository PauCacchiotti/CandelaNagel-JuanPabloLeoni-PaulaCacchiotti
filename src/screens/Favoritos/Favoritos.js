import React, { Component } from "react";
import Cookies from "universal-cookie";
import Card from "../../componentes/Card/Card";

const cookies = new Cookies();

class Favoritos extends Component {
    constructor(props){
        super(props)
        this.state = {
            peliculasFavoritas: [],
            seriesFavoritas: []
        }
    }
    componentDidMount(){
        let usuario = cookies.get("user-auth-cookie");
        if(usuario === undefined){
            this.props.history.push("/login");
        } else {
            let claveFavoritos = "favoritos-" + usuario;
            let favoritosStorage = localStorage.getItem(claveFavoritos);
            if(favoritosStorage !== null){
                let favoritosParseado = JSON.parse(favoritosStorage);
                let peliculas = favoritosParseado.filter(
                    favorito => favorito.tipo === "movie"
                );
                let series = favoritosParseado.filter(
                    favorito => favorito.tipo === "tv"
                );
                this.setState({
                    peliculasFavoritas: peliculas,
                    seriesFavoritas: series
                });
            }
        }
    }
    actualizarFavoritos(id, tipo){
        if(tipo === "movie"){
            let peliculasActualizadas = this.state.peliculasFavoritas.filter(
                pelicula => pelicula.id !== id
            );
            this.setState({
                peliculasFavoritas: peliculasActualizadas
            });
        } else {
            let seriesActualizadas = this.state.seriesFavoritas.filter(
                serie => serie.id !== id
            );
            this.setState({
                seriesFavoritas: seriesActualizadas
            });
        }
    }
    render(){
        return(
            <div>
                <h1>Favoritos</h1>
                <h2>Películas favoritas</h2>
                <section className="cards">
                    {
                        this.state.peliculasFavoritas.length > 0 ?
                        this.state.peliculasFavoritas.map((pelicula) =>
                            <Card
                                key={pelicula.id}
                                contenido={pelicula}
                                tipo="movie"
                                actualizarFavoritos={(id, tipo) => this.actualizarFavoritos(id, tipo)}
                            />
                        )
                        :
                        <p>No tenés películas favoritas.</p>
                    }
                </section>
                <h2>Series favoritas</h2>
                <section className="cards">
                    {
                        this.state.seriesFavoritas.length > 0 ?
                        this.state.seriesFavoritas.map((serie) =>
                            <Card
                                key={serie.id}
                                contenido={serie}
                                tipo="tv"
                                actualizarFavoritos={(id, tipo) => this.actualizarFavoritos(id, tipo)}
                            />
                        )
                        :
                        <p>No tenés series favoritas.</p>
                    }
                </section>
            </div>
        )
    }
}

export default Favoritos;