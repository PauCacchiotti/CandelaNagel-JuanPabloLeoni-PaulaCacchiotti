import React,  { useState, useEffect } from "react";
import Card from "../../componentes/Card/Card";
import "./Series.css";
import Filtro from "../../componentes/Filtro/Filtro";

function Series() {
    const [series, setSeries] = useState([]);
    const [seriesFiltradas, setSeriesFiltradas] = useState([]);
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=e7925d2a271ab3943d2cc21147be472b")
        .then(response => response.json())
        .then(data => {
            setSeries(data.results);
            setSeriesFiltradas(data.results);
        })
        .catch(error => console.log(error));
    }, [])
    function masSeries(){
        let paginaSiguiente = pagina + 1;
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=e7925d2a271ab3943d2cc21147be472b&page=${paginaSiguiente}`)
            .then(response => response.json())
            .then(data => {
                const todasLasSeries = series.concat(data.results);
                setSeries(todasLasSeries);
                setSeriesFiltradas(todasLasSeries);
                setPagina(paginaSiguiente);
            })
            .catch(error => console.log(error));
    }
    function filtrarSeries(input) {
        const seriesFiltradas = series.filter(
            (serie) =>
                serie.name
                    .toLowerCase()
                    .includes(input.toLowerCase())
        );
        setSeriesFiltradas(seriesFiltradas);
    }
    return(
        <React.Fragment>
            <h1>Series</h1>
            <Filtro filtrarContenido={(texto) => filtrarSeries(texto)}/>
            {
                series.length === 0 ?
                <h3>Cargando...</h3>
                :
                <section className="cards">
                    {
                        seriesFiltradas.map((serie) =>
                            <Card
                                key={serie.id}
                                contenido={serie}
                                tipo="tv"
                            />
                        )
                    }
                </section>
            }
            <button onClick={() => masSeries()}>
                Más series
            </button>
        </React.Fragment>
    );
}

export default Series;