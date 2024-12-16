import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuarios";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import AuthService from "../app/service/authService";


function RotaAutenticada( { component: Component, ...props}) {
    return (
         <Route {...props} render={ (componentProps) => {
            if(AuthService.isUsuarioAutenticado()){
               return (
                  <Component {...componentProps} />
               )
            }else{
                return(
                    <Redirect to={ {pathname : '/login' , state : { from: componentProps.location }}} />
                )
            }
       }} />
    )
}

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>

                <RotaAutenticada path="/home" component={Home}></RotaAutenticada>
                <RotaAutenticada path="/consulta-lancamentos" component={ConsultaLancamentos}></RotaAutenticada>
                <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}></RotaAutenticada>
            </Switch>
       </HashRouter>
    )
}

export default Rotas
