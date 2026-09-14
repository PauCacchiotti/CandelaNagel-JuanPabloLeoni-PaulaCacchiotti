import React, { Component } from "react";
import FormLogin from "../../componentes/FormLogin/FormLogin";

class Login extends Component {

    constructor(props){
        super(props)

        this.state = {}
    }

    render(){

        return(

            <section>

                <h2>Login</h2>

                <FormLogin />

            </section>

        )

    }

}

export default Login;