import { useState } from "react";

function Filtro(props) {
    const [texto, setTexto] = useState("");

    function evitarSubmit(event) {
        event.preventDefault();
    }

    function controlarInput(event) {
        const valor = event.target.value;
        setTexto(valor);
        props.filtrarContenido(valor);
    }

    return (
        <form className="filter-form" onSubmit={(event) => evitarSubmit(event)}>
            <input
                type="text"
                value={texto}
                onChange={(event) => controlarInput(event)}
                placeholder="Buscar dentro de la lista"
            />
        </form>
    );
}

export default Filtro;
