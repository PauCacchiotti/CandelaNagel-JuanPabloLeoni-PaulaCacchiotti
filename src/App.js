import React from "react";
import Home from "./screens/Home/Home";
import Navbar from "./componentes/Navbar/Navbar";
import Footer from "./componentes/Footer/Footer";
import Favoritos from "./screens/Favoritos/Favoritos";
import Series from "./screens/Series/Series";
import { Route, Switch } from "react-router-dom";
import NotFound from "./screens/NotFound/NotFound";
import PeliculasPopulares from "./screens/PeliculasPopulares/PeliculasPopulares";
import PeliculasCartelera from "./screens/PeliculasCartelera/PeliculasCartelera";
import Register from "./screens/Register/Register";
import Login from "./screens/Login/Login";

function App(){

    return(

        <div>

            <Navbar />

            <Switch>
              <Route path="/" exact={true} component={Home}/>

              <Route path="/Series" component={Series}/>

              <Route path="/PeliculasPopulares" component={PeliculasPopulares} />
              <Route path="/PeliculasCartelera" component={PeliculasCartelera} />

              <Route path="/Favoritos" component={Favoritos}/>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>

              <Route path="" component={NotFound}/>
            </Switch>
            <Footer/>

        </div>

    )

}

export default App;