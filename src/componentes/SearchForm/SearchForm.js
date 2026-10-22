import { useState } from "react";
import { withRouter } from "react-router-dom";
import "./SearchForm.css";

function SearchForm(props) {
    const [busqueda, setBusqueda] = useState("");
    const [tipo, setTipo] = useState("movie");

    function controlarCambios(evento){
        setBusqueda(evento.target.value)
    }
    function controlarTipo(evento){
        setTipo(evento.target.value)
    }
    function evitarSubmit(evento){
        evento.preventDefault()
        props.history.push("/busqueda/" + tipo + "/" + busqueda)
    }

    return(
        <form className="search-form" onSubmit={(evento) => evitarSubmit(evento)}>
            <input
                type="text"
                value={busqueda}
                onChange={(evento) => controlarCambios(evento)}
                placeholder="Buscar películas"
            />
            <select value={tipo} onChange={(evento) => controlarTipo(evento)}>
                <option value="movie">Películas</option>
                <option value="tv">Series</option>
            </select>
            <button type="submit">
                Buscar
            </button>
        </form> 
    )
}

export default withRouter(SearchForm);
