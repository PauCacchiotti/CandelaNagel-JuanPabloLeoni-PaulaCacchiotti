import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class FormRegister extends Component {

    constructor(props){
        super(props)

        this.state = {
            email: "",
            password: ""
        }
    }

    controlarEmail(evento){
        this.setState({
            email: evento.target.value
        })
    }

    controlarPassword(evento){
        this.setState({
            password: evento.target.value
        })
    }

    submit(evento){
        evento.preventDefault()

        let usuarioACrear = {
            email: this.state.email,
            password: this.state.password
        }

        if (!usuarioACrear.email.includes("@")) {
            alert("El email ingresado no es válido")
            return
        }

        if (usuarioACrear.password.length < 6) {
            alert("La contraseña debe tener un mínimo de 6 caracteres")
            return
        }

        let usersStorage = localStorage.getItem("users")

        if (usersStorage !== null) {
            let usersParseado = JSON.parse(usersStorage)
            let usersFiltrado = usersParseado.filter(user => user.email === usuarioACrear.email)

            if (usersFiltrado.length > 0) {
                alert("Ya existe un usuario con el email ingresado")
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

        this.props.history.push("/login")
    }

    render(){

        return(

            <form onSubmit={(evento) => this.submit(evento)}>

                <label>Email</label>
                <input
                    type="text"
                    value={this.state.email}
                    onChange={(evento) => this.controlarEmail(evento)}
                    placeholder="Ingresá tu email"
                />

                <label>Contraseña</label>
                <input
                    type="password"
                    value={this.state.password}
                    onChange={(evento) => this.controlarPassword(evento)}
                    placeholder="Ingresá tu contraseña"
                />

                <button type="submit">
                    Registrarse
                </button>

            </form>

        )

    }

}

export default withRouter(FormRegister);