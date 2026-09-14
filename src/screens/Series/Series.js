import React, { Component } from "react";
import Card from "../../componentes/Card/Card";
import "./Series.css";
import Filtro from "../../componentes/Filtro/Filtro";

class Series extends Component{
    constructor(props){
        super(props);
        this.state = {
            series:[],
            seriesFiltradas:[],
            pagina:1
        };
    }
    componentDidMount(){
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=e7925d2a271ab3943d2cc21147be472b")
        .then(response => response.json())
        .then(data => this.setState({
            series: data.results,
            seriesFiltradas: data.results
        }))
        .catch(error => console.log(error));
    }
    masSeries(){
        let paginaSiguiente = this.state.pagina + 1;
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=e7925d2a271ab3943d2cc21147be472b&page=${paginaSiguiente}`)
            .then(response => response.json())
            .then(data => {

                const todasLasSeries =
                    this.state.series.concat(data.results);

                this.setState({
                    series: todasLasSeries,
                    seriesFiltradas: todasLasSeries,
                    pagina: paginaSiguiente
                });

            })
            .catch(error => console.log(error));
    }
    filtrarSeries(input) {
        const seriesFiltradas = this.state.series.filter(
            (serie) =>
                serie.name
                    .toLowerCase()
                    .includes(input.toLowerCase())
        );
        this.setState({
            seriesFiltradas: seriesFiltradas
        });
    }
    render(){
        return(
            <>
                <h1>Series</h1>
                <Filtro filtrarContenido={(texto) => this.filtrarSeries(texto)}/>
                <section className="cards">
                    {
                    this.state.seriesFiltradas.map((serie, idx) => 
                        <Card key={idx} contenido={serie} />)
                    }
                </section>
                <button onClick={() => this.masSeries()}>
                    Más series
                </button>
            </>
        );
    }
}

export default Series;