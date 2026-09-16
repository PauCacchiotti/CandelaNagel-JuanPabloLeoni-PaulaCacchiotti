import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "../../componentes/Card/Card";
import SearchForm from "../../componentes/SearchForm/SearchForm";
import "./Home.css";

class Home extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            peliculasPopulares :[],
            peliculasCartelera: []
        }

    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=e7925d2a271ab3943d2cc21147be472b")

        .then(response => response.json())
        .then(data => this.setState({
                peliculasPopulares: data.results
            }))
        .catch(error => console.log(error))

        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=e7925d2a271ab3943d2cc21147be472b")

        .then(response => response.json())

        .then(data => this.setState({
            peliculasCartelera: data.results
        }))

        .catch(error => console.log(error))

    
    }

    render(){

            console.log(this.state.peliculasPopulares)

            return(

                <div>

                    <h1>Nombre de la aplicación</h1>

                    <h2>Bienvenidos</h2>

                    <SearchForm />

                    <h2>Películas Populares</h2>
                    <Link to="/PeliculasPopulares">Ver todas</Link>

                    <section className="cards">
                        {
                             this.state.peliculasPopulares.map((pelicula, idx) =>
                             <Card
                             key={idx}
                             contenido={pelicula}
                             tipo="movie"
                             />
                            )
                        }
                    </section>
                    <h2>Películas Cartelera</h2>
                    
                    <Link to="/PeliculasCartelera">Ver todas</Link>
                    <section className="cards">

                        {
                            this.state.peliculasCartelera.map((pelicula, idx) =>
                            <Card
                            key={idx}
                            contenido={pelicula}
                            tipo="movie"
                             />
                             )
                        }
                    </section>


                </div>

            )

    }

}

export default Home