import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Card.css";

const cookies = new Cookies();

class Card extends Component {

    constructor(props){
        super(props)
        this.state = {
            verDescripcion: false,
            esFavorito: false
        }
    }

    componentDidMount(){
    let favoritosStorage = localStorage.getItem("favoritos");

    if(favoritosStorage !== null){
        let favoritosParseado = JSON.parse(favoritosStorage);

        let favoritosFiltrado = favoritosParseado.filter(favorito =>
            favorito.id === this.props.contenido.id &&
            favorito.tipo === this.props.tipo
        );

        if(favoritosFiltrado.length > 0){
            this.setState({
                esFavorito: true
            });
        }
    }
    }

    mostrarDescripcion(){
        this.setState({
            verDescripcion: !this.state.verDescripcion
        })
    }

    agregarFavorito(){
        let favoritoACrear = {
            id: this.props.contenido.id,
            tipo: this.props.tipo,
            title: this.props.contenido.title,
            name: this.props.contenido.name,
            poster_path: this.props.contenido.poster_path,
            overview: this.props.contenido.overview
        };

        let favoritosStorage = localStorage.getItem("favoritos");

        if(favoritosStorage !== null){
            let favoritosParseado = JSON.parse(favoritosStorage);
            favoritosParseado.push(favoritoACrear);
            localStorage.setItem("favoritos", JSON.stringify(favoritosParseado));
        } else {
            let favoritosInicial = [favoritoACrear];
            localStorage.setItem("favoritos", JSON.stringify(favoritosInicial));
        }

        this.setState({
            esFavorito: true
        });
    }

    quitarFavorito(){
        let favoritosStorage = localStorage.getItem("favoritos");

        if(favoritosStorage !== null){
            let favoritosParseado = JSON.parse(favoritosStorage);

            let favoritosFiltrado = favoritosParseado.filter(favorito =>
                favorito.id !== this.props.contenido.id ||
                favorito.tipo !== this.props.tipo
            );

            localStorage.setItem("favoritos", JSON.stringify(favoritosFiltrado));
        }

        this.setState({
            esFavorito: false
        });
    }

    render(){

        if(cookies.get("user-auth-cookie") !== undefined){


        return(

            <article className="single-card-movie">

                <img
                    src={"https://image.tmdb.org/t/p/w342" + this.props.contenido.poster_path}
                    alt={this.props.contenido.title || this.props.contenido.name}
                    className="card-img-top"
                />
                <div className="cardBody">
                    <h3>{this.props.contenido.title || this.props.contenido.name}</h3>

                    <button onClick={() => this.mostrarDescripcion()}>
                        {
                            this.state.verDescripcion === false ?
                            "Mostrar descripción" :
                            "Ocultar descripción"
                        }
                    </button>

                    {
                        this.state.verDescripcion === true ?
                        <p>{this.props.contenido.overview}</p>
                        :
                        ""
                    }
                    <Link to={"/detalle/" + this.props.tipo + "/" + this.props.contenido.id}>
                        Ver detalle
                    </Link>
                    {
                       this.state.esFavorito === false ?
                        <button onClick={() => this.agregarFavorito()}>
                            Agregar a favoritos
                        </button>
                        :
                        <button onClick={() => this.quitarFavorito()}>
                            Quitar de favoritos
                        </button> 
                    }


                </div>

            </article>
            )

        }else{
            return(
                <article className="single-card-movie">

                <img
                    src={"https://image.tmdb.org/t/p/w342" + this.props.contenido.poster_path}
                    alt={this.props.contenido.title || this.props.contenido.name}
                    className="card-img-top"
                />

                <div className="cardBody">

                    <h3>{this.props.contenido.title || this.props.contenido.name}</h3>

                    <button onClick={() => this.mostrarDescripcion()}>
                        {
                            this.state.verDescripcion === false ?
                            "Mostrar descripción" :
                            "Ocultar descripción"
                        }
                    </button>

                    {
                        this.state.verDescripcion === true ?
                        <p>{this.props.contenido.overview}</p>
                        :
                        ""
                    }

                    <Link to={"/detalle/" + this.props.tipo + "/" + this.props.contenido.id}>
                        Ver detalle
                    </Link>

                </div>

            </article> 
            )
        }

    }

}

export default Card;