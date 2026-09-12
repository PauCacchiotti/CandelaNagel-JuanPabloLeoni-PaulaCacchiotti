import React, { Component } from "react";

class SearchForm extends Component {

    constructor(props){
        super(props)

        this.state = {
            busqueda: ""
        }
    }

    controlarCambios(evento){
        this.setState({
            busqueda: evento.target.value
        })
    }

    evitarSubmit(evento){
        evento.preventDefault()
    }

    render(){

        return(

            <form onSubmit={(evento) => this.evitarSubmit(evento)}>

                <input
                    type="text"
                    value={this.state.busqueda}
                    onChange={(evento) => this.controlarCambios(evento)}
                    placeholder="Buscar películas"
                />

                <button type="submit">
                    Buscar
                </button>

            </form>

        )

    }

}

export default SearchForm;