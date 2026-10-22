import { useState, useEffect } from "react";
import Card from "../../componentes/Card/Card";

function ResultadosBusqueda(props) {
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(true);

    let tipo = props.match.params.tipo

    useEffect(() => {
        let busqueda = props.match.params.busqueda
        fetch("https://api.themoviedb.org/3/search/" + tipo + "?api_key=e7925d2a271ab3943d2cc21147be472b&query=" + busqueda)
        .then(response => response.json())
        .then(data => {
            setResultados(data.results)
            setCargando(false)
        })
        .catch(error => console.log(error))
    }, [])

    return(
        <div>
            <h1>Resultados de búsqueda</h1>
            <h2>
                {tipo === "movie" ? "Películas" : "Series"}
            </h2>
            <section className="cards">
                {
                    cargando === true ?
                    <h3>Cargando...</h3>
                    :
                    resultados.map((resultado, idx) =>
                        <Card
                            key={idx}
                            contenido={resultado}
                            tipo={tipo}
                        />
                    )
                }
            </section>
        </div>
    )
}

export default ResultadosBusqueda;
