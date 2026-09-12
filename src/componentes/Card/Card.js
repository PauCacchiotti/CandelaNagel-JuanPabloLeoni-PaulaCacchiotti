import React, { Component } from "react";

class Card extends Component {

    constructor(props){
        super(props)

        this.state = {
            verDescripcion: false
        }
    }

    mostrarDescripcion(){
        this.setState({
            verDescripcion: !this.state.verDescripcion
        })
    }

    render(){

        return(

            <div>

                <img
                    src={"https://image.tmdb.org/t/p/w342" + this.props.pelicula.poster_path}
                    alt={this.props.pelicula.title}
                />

                <h3>{this.props.pelicula.title}</h3>

                <button onClick={() => this.mostrarDescripcion()}>
                    {
                        this.state.verDescripcion === false ?
                        "Mostrar descripción" :
                        "Ocultar descripción"
                    }
                </button>

                {
                    this.state.verDescripcion === true ?
                    <p>{this.props.pelicula.overview}</p>
                    :
                    ""
                }

            </div>

        )

    }

}

export default Card;