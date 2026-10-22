import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Card.css";

const cookies = new Cookies();

function Card(props){
    const [verDescripcion, setVerDescripcion] = useState(false);
    const [esFavorito, setEsFavorito] = useState(false);

    useEffect(() => {
        let usuario = cookies.get("user-auth-cookie");
        if(usuario !== undefined){
            let claveFavoritos = "favoritos-" + usuario;
            let favoritosStorage = localStorage.getItem(claveFavoritos);
            if(favoritosStorage !== null){
                let favoritosParseado = JSON.parse(favoritosStorage);
                let favoritosFiltrado = favoritosParseado.filter(favorito =>
                    favorito.id === props.contenido.id &&
                    favorito.tipo === props.tipo
                );
                if(favoritosFiltrado.length > 0){
                    setEsFavorito(true);
                }
            }
        }
    }, []);

    function mostrarDescripcion(){
        setVerDescripcion(!verDescripcion);
    }

    function agregarFavorito(){
        let usuario = cookies.get("user-auth-cookie");
        let claveFavoritos = "favoritos-" + usuario;
        let favoritoACrear = {
            id: props.contenido.id,
            tipo: props.tipo,
            title: props.contenido.title,
            name: props.contenido.name,
            poster_path: props.contenido.poster_path,
            overview: props.contenido.overview
        };
        let favoritosStorage = localStorage.getItem(claveFavoritos);
        if(favoritosStorage !== null){
            let favoritosParseado = JSON.parse(favoritosStorage);
            favoritosParseado.push(favoritoACrear);
            localStorage.setItem(claveFavoritos, JSON.stringify(favoritosParseado));
        } else {
            let favoritosInicial = [favoritoACrear];
            localStorage.setItem(claveFavoritos, JSON.stringify(favoritosInicial));
        }
        setEsFavorito(true);
    }

    function quitarFavorito(){
        let usuario = cookies.get("user-auth-cookie");
        let claveFavoritos = "favoritos-" + usuario;
        let favoritosStorage = localStorage.getItem(claveFavoritos);
        if(favoritosStorage !== null){
            let favoritosParseado = JSON.parse(favoritosStorage);
            let favoritosFiltrado = favoritosParseado.filter(favorito =>
                favorito.id !== props.contenido.id ||
                favorito.tipo !== props.tipo
            );
            localStorage.setItem(claveFavoritos, JSON.stringify(favoritosFiltrado));
        }
        setEsFavorito(false);
        if(props.actualizarFavoritos !== undefined){
            props.actualizarFavoritos(
                props.contenido.id,
                props.tipo
            );
        }
    }

    if(cookies.get("user-auth-cookie") !== undefined){
        return(
            <article className="single-card-movie">
                <img
                    src={"https://image.tmdb.org/t/p/w342" + props.contenido.poster_path}
                    alt={props.contenido.title || props.contenido.name}
                    className="card-img-top"
                />
                <div className="cardBody">
                    <h3>{props.contenido.title || props.contenido.name}</h3>
                    <button onClick={() => mostrarDescripcion()}>
                        {
                            verDescripcion === false ?
                            "Mostrar descripción" :
                            "Ocultar descripción"
                        }
                    </button>
                    {
                        verDescripcion === true ?
                        <p>{props.contenido.overview}</p>
                        :
                        ""
                    }
                    <Link to={"/detalle/" + props.tipo + "/" + props.contenido.id}>
                        Ver detalle
                    </Link>
                    {
                        esFavorito === false ?
                        <button onClick={() => agregarFavorito()}>
                            Agregar a favoritos
                        </button>
                        :
                        <button onClick={() => quitarFavorito()}>
                            Quitar de favoritos
                        </button>
                    }
                </div>
            </article>
        )
    } else {
        return(
            <article className="single-card-movie">
                <img
                    src={"https://image.tmdb.org/t/p/w342" + props.contenido.poster_path}
                    alt={props.contenido.title || props.contenido.name}
                    className="card-img-top"
                />
                <div className="cardBody">
                    <h3>{props.contenido.title || props.contenido.name}</h3>
                    <button onClick={() => mostrarDescripcion()}>
                        {
                            verDescripcion === false ?
                            "Mostrar descripción" :
                            "Ocultar descripción"
                        }
                    </button>
                    {
                        verDescripcion === true ?
                        <p>{props.contenido.overview}</p>
                        :
                        ""
                    }
                    <Link to={"/detalle/" + props.tipo + "/" + props.contenido.id}>
                        Ver detalle
                    </Link>
                </div>
            </article>
        )
    }
}

export default Card;
