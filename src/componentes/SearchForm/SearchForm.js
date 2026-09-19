import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./SearchForm.css";

class SearchForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            busqueda: "",
            tipo: "movie"
        }
    }
    controlarCambios(evento){
        this.setState({
            busqueda: evento.target.value
        })
    }
    controlarTipo(evento){
        this.setState({
            tipo: evento.target.value
        })
    }
    evitarSubmit(evento){
        evento.preventDefault()
        this.props.history.push("/busqueda/" + this.state.tipo + "/" + this.state.busqueda)
    }
    render(){
        return(
            <form className="search-form" onSubmit={(evento) => this.evitarSubmit(evento)}>
                <input
                    type="text"
                    value={this.state.busqueda}
                    onChange={(evento) => this.controlarCambios(evento)}
                    placeholder="Buscar películas"
                />
                <select value={this.state.tipo} onChange={(evento) => this.controlarTipo(evento)}>
                    <option value="movie">Películas</option>
                    <option value="tv">Series</option>
                </select>
                <button type="submit">
                    Buscar
                </button>
            </form>
        )
    }
}

export default withRouter(SearchForm);

