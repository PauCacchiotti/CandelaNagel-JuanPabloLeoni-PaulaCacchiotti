import { useState } from "react";
import { withRouter } from "react-router-dom";
import "./FormRegister.css";

function FormRegister(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensajeError, setMensajeError] = useState("");

    function controlarEmail(event){
        setEmail(event.target.value)
    }
    function controlarPassword(event){
        setPassword(event.target.value)
    }
    function submit(event){
        event.preventDefault()
        let usuarioACrear = {
            email: email,
            password: password
        }
        if (!usuarioACrear.email.includes("@")) {
            setMensajeError("El email ingresado no es válido")
            return
        }
        if (usuarioACrear.password.length < 6) {
            setMensajeError("La contraseña debe tener un mínimo de 6 caracteres")
            return
        }
        let usersStorage = localStorage.getItem("users")
        if (usersStorage !== null) {
            let usersParseado = JSON.parse(usersStorage)
            let usersFiltrado = usersParseado.filter(user => user.email === usuarioACrear.email)
            if (usersFiltrado.length > 0) {
                setMensajeError("Ya existe un usuario con el email ingresado")
                return
            }
            usersParseado.push(usuarioACrear)
            let usersEnJson = JSON.stringify(usersParseado)
            localStorage.setItem("users", usersEnJson)
        } else {
            let usersInicial = [usuarioACrear]
            let usersEnJson = JSON.stringify(usersInicial)
            localStorage.setItem("users", usersEnJson)
        }
        props.history.push("/login")
    }

    return(
        <form className="register-form" onSubmit={(event) => submit(event)}>
            <label>Email</label>
            <input
                type="text"
                value={email}
                onChange={(event) => controlarEmail(event)}
                placeholder="Ingresá tu email"
            />
            <label>Contraseña</label>
            <input
                type="password"
                value={password}
                onChange={(event) => controlarPassword(event)}
                placeholder="Ingresá tu contraseña"
            />
            <button type="submit">
                Registrarse
            </button>
            {
                mensajeError !== "" ?
                <p>{mensajeError}</p>
                :
                ""
            }
        </form>
    )
}

export default withRouter(FormRegister);
