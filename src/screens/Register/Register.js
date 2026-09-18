import React, { Component } from "react";
import FormRegister from "../../componentes/FormRegister/FormRegister";

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <section>
                <h2>Registro</h2>
                <FormRegister />
            </section>
        )
    }
}

export default Register;