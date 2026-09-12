import React from "react";
import Home from "./screens/Home/Home";
import Navbar from "./componentes/Navbar/Navbar";
import Footer from "./componentes/Footer/Footer";
import Favoritos from "./screens/Favoritos/Favoritos";
import Listado from "./screens/Listado/Listado";
import { Route, Switch } from "react-router-dom";

function App(){

    return(

        <div>

            <Navbar />

            <Switch>
              <Route path="/Listado" component={Listado}/>

              <Route path="/Favoritos" component={Favoritos}/>

              <Route path="/" exact={true} component={Home}/>

            </Switch>
           

            <Footer/>

        </div>

    )

}

export default App;