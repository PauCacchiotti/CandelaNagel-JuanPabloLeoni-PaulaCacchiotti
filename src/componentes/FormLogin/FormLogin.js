import { useState } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import "./FormLogin.css";

const cookies = new Cookies()

function FormLogin(props) {
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
        let usersStorage = localStorage.getItem("users")
        if (usersStorage === null) {
            setMensajeError("Credenciales incorrectas")
            return
        }
        let usersParseado = JSON.parse(usersStorage)
        let usersFiltrado = usersParseado.filter(user => user.email === email && user.password === password)
        let user = usersFiltrado[0]
        if (user) {
            cookies.set("user-auth-cookie", user.email)
            props.history.push("/")
        } else {
            setMensajeError("Credenciales incorrectas")
        }
    }

    return(
        <form className="login-form" onSubmit={(event) => submit(event)}>
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
                Iniciar sesión
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

export default withRouter(FormLogin);
