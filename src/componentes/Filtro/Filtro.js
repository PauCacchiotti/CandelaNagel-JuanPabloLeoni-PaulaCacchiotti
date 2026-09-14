import React, { Component } from "react";

class Filtro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: ""
        };
    }
    evitarSubmit(event) {
        event.preventDefault();
    }
    controlarInput(event) {
        const valor = event.target.value;
        this.setState({
            texto: valor
        });
        this.props.filtrarContenido(valor);
    }
    render() {
        return (
            <form className="filter-form" onSubmit={(event) => this.evitarSubmit(event)}>
                <input
                    type="text"
                    value={this.state.texto}
                    onChange={(event) => this.controlarInput(event)}
                    placeholder="Buscar dentro de la lista"
                />
            </form>
        );
    }
}

export default Filtro;