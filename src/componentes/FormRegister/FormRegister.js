import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            mensajeError: ""
        }
    }
    controlarEmail(event){
        this.setState({
            email: event.target.value
        })
    }
    controlarPassword(event){
        this.setState({
            password: event.target.value
        })
    }
    submit(event){
        event.preventDefault()
        let usuarioACrear = {
            email: this.state.email,
            password: this.state.password
        }
            if (!usuarioACrear.email.includes("@")) {
            this.setState({
                mensajeError: "El email ingresado no es válido"
            })
            return
        }
        if (usuarioACrear.password.length < 6) {
            this.setState({
                mensajeError: "La contraseña debe tener un mínimo de 6 caracteres"
            })
            return
        }
        let usersStorage = localStorage.getItem("users")
        if (usersStorage !== null) {
            let usersParseado = JSON.parse(usersStorage)
            let usersFiltrado = usersParseado.filter(user => user.email === usuarioACrear.email)
            if (usersFiltrado.length > 0) {
                this.setState({
                    mensajeError: "Ya existe un usuario con el email ingresado"
                })
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
            <form onSubmit={(event) => this.submit(event)}>
                <label>Email</label>
                <input
                    type="text"
                    value={this.state.email}
                    onChange={(event) => this.controlarEmail(event)}
                    placeholder="Ingresá tu email"
                />
                <label>Contraseña</label>
                <input
                    type="password"
                    value={this.state.password}
                    onChange={(event) => this.controlarPassword(event)}
                    placeholder="Ingresá tu contraseña"
                />
                <button type="submit">
                    Registrarse
                </button>
                {
                    this.state.mensajeError !== "" ?
                    <p>{this.state.mensajeError}</p>
                    :
                    ""
                }
            </form>
        )
    }
}

export default withRouter(FormRegister);