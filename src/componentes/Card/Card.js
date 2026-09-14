import React, { Component } from "react";
import "./Card.css";

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

            <article className="single-card-movie">

                <img
                    src={"https://image.tmdb.org/t/p/w342" + this.props.contenido.poster_path}
                    alt={this.props.contenido.title || this.props.contenido.name}
                    className="card-img-top"
                />
                <div className="cardBody">
                    <h3>{this.props.contenido.title || this.props.contenido.name}</h3>

                    <button onClick={() => this.mostrarDescripcion()}>
                        {
                            this.state.verDescripcion === false ?
                            "Mostrar descripción" :
                            "Ocultar descripción"
                        }
                    </button>

                    {
                        this.state.verDescripcion === true ?
                        <p>{this.props.contenido.overview}</p>
                        :
                        ""
                    }
                </div>

            </article>

        )

    }

}

export default Card;