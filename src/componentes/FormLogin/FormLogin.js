import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies()

class FormLogin extends Component {

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

        let usersStorage = localStorage.getItem("users")

        if (usersStorage === null) {
            this.setState({
                mensajeError: "Credenciales incorrectas"
            })
            return
        }

        let usersParseado = JSON.parse(usersStorage)
        let usersFiltrado = usersParseado.filter(user => user.email === this.state.email && user.password === this.state.password)
        let user = usersFiltrado[0]

        if (user) {
            cookies.set("user-auth-cookie", user.email)
            this.props.history.push("/")
        } else {
            this.setState({
                mensajeError: "Credenciales incorrectas"
            })
        }
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
                    Iniciar sesión
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

export default withRouter(FormLogin);