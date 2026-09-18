import React, { Component } from "react";
import Card from "../../componentes/Card/Card";

class ResultadosBusqueda extends Component {
    constructor(props){
        super(props)
        this.state = {
            resultados: [],
            cargando: true
        }
    }
    componentDidMount(){
        let tipo = this.props.match.params.tipo
        let busqueda = this.props.match.params.busqueda
        fetch("https://api.themoviedb.org/3/search/" + tipo + "?api_key=e7925d2a271ab3943d2cc21147be472b&query=" + encodeURIComponent(busqueda))
        .then(response => response.json())
        .then(data => this.setState({
            resultados: data.results,
            cargando: false
        }))
        .catch(error => console.log(error))
    }
    render(){
        let tipo = this.props.match.params.tipo
        return(
            <div>
                <h1>Resultados de búsqueda</h1>
                <h2>
                    {tipo === "movie" ? "Películas" : "Series"}
                </h2>
                <section className="cards">
                    {
                        this.state.cargando === true ?
                        <h3>Cargando...</h3>
                        :
                        this.state.resultados.map((resultado, idx) =>
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
}

export default ResultadosBusqueda;