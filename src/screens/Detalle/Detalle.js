import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies()

function Detalle(props) {
    const [contenido, setContenido] = useState("");
    const [esFavorito, setEsFavorito] = useState(false);

    let tipo = props.match.params.tipo
    let id = props.match.params.id

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/" + tipo + "/" + id + "?api_key=e7925d2a271ab3943d2cc21147be472b&language=es-AR")
            .then(response => response.json())
            .then(data => setContenido(data))
            .catch(error => console.log(error))
        let usuario = cookies.get("user-auth-cookie");
        if(usuario !== undefined){
            let claveFavoritos = "favoritos-" + usuario;
            let favoritosStorage = localStorage.getItem(claveFavoritos);
            if (favoritosStorage !== null) {
                let favoritosParseado = JSON.parse(favoritosStorage);
                let favoritosFiltrado = favoritosParseado.filter(
                    favorito =>
                        favorito.id === Number(id) &&
                        favorito.tipo === tipo
                );
                if (favoritosFiltrado.length > 0) {
                    setEsFavorito(true);
                }
            }
        }
    }, [])

    function agregarFavorito(){
        let usuario = cookies.get("user-auth-cookie");
        let claveFavoritos = "favoritos-" + usuario;
        let favoritoACrear = {
            id: contenido.id,
            tipo: tipo,
            title: contenido.title,
            name: contenido.name,
            poster_path: contenido.poster_path,
            overview: contenido.overview
        }
        let favoritosStorage = localStorage.getItem(claveFavoritos)
        if (favoritosStorage !== null) {
            let favoritosParseado = JSON.parse(favoritosStorage)
            favoritosParseado.push(favoritoACrear)
            let favoritosEnJson = JSON.stringify(favoritosParseado)
            localStorage.setItem(claveFavoritos, favoritosEnJson)
        } else {
            let favoritosInicial = [favoritoACrear]
            let favoritosEnJson = JSON.stringify(favoritosInicial)
            localStorage.setItem(claveFavoritos, favoritosEnJson)
        }
        setEsFavorito(true)
    }

    function quitarFavorito(){
        let usuario = cookies.get("user-auth-cookie");
        let claveFavoritos = "favoritos-" + usuario;
        let favoritosStorage = localStorage.getItem(claveFavoritos)
        let favoritosParseado = JSON.parse(favoritosStorage)
        let favoritosFiltrado = favoritosParseado.filter(favorito => favorito.id !== contenido.id || favorito.tipo !== tipo)
        let favoritosEnJson = JSON.stringify(favoritosFiltrado)
        localStorage.setItem(claveFavoritos, favoritosEnJson)
        setEsFavorito(false)
    }

    return(
        <section>
            {
                contenido === "" ?
                <h3>Cargando...</h3>
                :
                <article>
                    <img
                        src={"https://image.tmdb.org/t/p/w342" + contenido.poster_path}
                        alt={contenido.title || contenido.name}
                    />
                    <h2>{contenido.title || contenido.name}</h2>
                    <p>Calificación: {contenido.vote_average}</p>
                    <p>Fecha de estreno: {contenido.release_date || contenido.first_air_date}</p>
                    {
                        tipo === "movie" ?
                        <p>Duración: {contenido.runtime} minutos</p>
                        :
                        ""
                    }
                    <p>Sinopsis: {contenido.overview}</p>
                    <p>Género:</p>
                    <ul>
                        {
                            contenido.genres.map((genero, idx) =>
                                <li key={genero.id + idx}>{genero.name}</li>
                            )
                        }
                    </ul>
                    {
                        cookies.get("user-auth-cookie") ?
                            (
                                esFavorito === false ?
                                <button onClick={() => agregarFavorito()}>Agregar a favoritos</button>
                                :
                                <button onClick={() => quitarFavorito()}>Quitar de favoritos</button>
                            )
                        :
                        ""
                    }
                </article>
            }
        </section>
    )
}

export default Detalle;
