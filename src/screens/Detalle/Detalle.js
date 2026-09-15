import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies()

class Detalle extends Component {

    constructor(props){
        super(props)

        this.state = {
            contenido: "",
            esFavorito: false
        }
    }

    componentDidMount(){
        let tipo = this.props.match.params.tipo
        let id = this.props.match.params.id

        fetch("https://api.themoviedb.org/3/" + tipo + "/" + id + "?api_key=e7925d2a271ab3943d2cc21147be472b&language=es-AR")
            .then(response => response.json())
            .then(data => this.setState({
                contenido: data
            }))
            .catch(error => console.log(error))

        let favoritosStorage = localStorage.getItem("favoritos")

        if (favoritosStorage !== null) {
            let favoritosParseado = JSON.parse(favoritosStorage)
            let favoritosFiltrado = favoritosParseado.filter(favorito => favorito.id === Number(id) && favorito.tipo === tipo)

            if (favoritosFiltrado.length > 0) {
                this.setState({
                    esFavorito: true
                })
            }
        }
    }

    agregarFavorito(){
        let favoritoACrear = {
            id: this.state.contenido.id,
            tipo: this.props.match.params.tipo,
            title: this.state.contenido.title,
            name: this.state.contenido.name,
            poster_path: this.state.contenido.poster_path,
            overview: this.state.contenido.overview
        }

        let favoritosStorage = localStorage.getItem("favoritos")

        if (favoritosStorage !== null) {
            let favoritosParseado = JSON.parse(favoritosStorage)
            favoritosParseado.push(favoritoACrear)
            let favoritosEnJson = JSON.stringify(favoritosParseado)
            localStorage.setItem("favoritos", favoritosEnJson)
        } else {
            let favoritosInicial = [favoritoACrear]
            let favoritosEnJson = JSON.stringify(favoritosInicial)
            localStorage.setItem("favoritos", favoritosEnJson)
        }

        this.setState({
            esFavorito: true
        })
    }

    quitarFavorito(){
        let favoritosStorage = localStorage.getItem("favoritos")
        let favoritosParseado = JSON.parse(favoritosStorage)
        let favoritosFiltrado = favoritosParseado.filter(favorito => favorito.id !== this.state.contenido.id || favorito.tipo !== this.props.match.params.tipo)
        let favoritosEnJson = JSON.stringify(favoritosFiltrado)
        localStorage.setItem("favoritos", favoritosEnJson)

        this.setState({
            esFavorito: false
        })
    }

    render(){

        return(

            <section>

                {
                    this.state.contenido === "" ?
                    <h3>Cargando...</h3>
                    :
                    <article>

                        <img
                            src={"https://image.tmdb.org/t/p/w342" + this.state.contenido.poster_path}
                            alt={this.state.contenido.title || this.state.contenido.name}
                        />

                        <h2>{this.state.contenido.title || this.state.contenido.name}</h2>

                        <p>Calificación: {this.state.contenido.vote_average}</p>

                        <p>Fecha de estreno: {this.state.contenido.release_date || this.state.contenido.first_air_date}</p>

                        {
                            this.props.match.params.tipo === "movie" ?
                            <p>Duración: {this.state.contenido.runtime} minutos</p>
                            :
                            ""
                        }

                        <p>Sinopsis: {this.state.contenido.overview}</p>

                        <p>Género:</p>
                        <ul>
                            {
                                this.state.contenido.genres.map((genero, idx) =>
                                    <li key={genero.id + idx}>{genero.name}</li>
                                )
                            }
                        </ul>

                        {
                            cookies.get("user-auth-cookie") ?
                                (
                                    this.state.esFavorito === false ?
                                    <button onClick={() => this.agregarFavorito()}>Agregar a favoritos</button>
                                    :
                                    <button onClick={() => this.quitarFavorito()}>Quitar de favoritos</button>
                                )
                            :
                            ""
                        }

                    </article>
                }

            </section>

        )

    }

}

export default Detalle;