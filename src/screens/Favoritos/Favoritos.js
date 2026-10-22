import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Card from "../../componentes/Card/Card";

const cookies = new Cookies();

function Favoritos (props) {
        const [peliculasFavoritas, setPeliculasFavoritas] = useState([]);
        const [seriesFavoritas, setSeriesFavoritas] = useState([]);

        useEffect(() => {
            let usuario = cookies.get("user-auth-cookie");

            if(usuario === undefined){
                props.history.push("/login");
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

                    setPeliculasFavoritas(peliculas);
                    setSeriesFavoritas(series);
                }
            }
        }, []);

        function actualizarFavoritos(id, tipo){
        if(tipo === "movie"){
            let peliculasActualizadas = peliculasFavoritas.filter(
                pelicula => pelicula.id !== id
            );

            setPeliculasFavoritas(peliculasActualizadas);
        } else {
            let seriesActualizadas = seriesFavoritas.filter(
                serie => serie.id !== id
            );

            setSeriesFavoritas(seriesActualizadas);
        }
        }

        return(
            <div>
                <h1>Favoritos</h1>
                <h2>Películas favoritas</h2>
                <section className="cards">
                    {
                        peliculasFavoritas.length > 0 ?
                        peliculasFavoritas.map((pelicula) =>
                            <Card
                                key={pelicula.id}
                                contenido={pelicula}
                                tipo="movie"
                                actualizarFavoritos={(id, tipo) => actualizarFavoritos(id, tipo)}
                            />
                        )
                        :
                        <p>No tenés películas favoritas.</p>
                    }
                </section>
                <h2>Series favoritas</h2>
                <section className="cards">
                    {
                        seriesFavoritas.length > 0 ?
                        seriesFavoritas.map((serie) =>
                            <Card
                                key={serie.id}
                                contenido={serie}
                                tipo="tv"
                                actualizarFavoritos={(id, tipo) => actualizarFavoritos(id, tipo)}
                            />
                        )
                        :
                        <p>No tenés series favoritas.</p>
                    }
                </section>
            </div>
        )

}


export default Favoritos;