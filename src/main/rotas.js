import React from "react";

import { Route, HashRouter, Switch, } from 'react-router-dom'
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuarios";

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Rotas