import React from "react";

import { Route, HashRouter, Switch, } from 'react-router-dom'
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuarios";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos}></Route>
                <Route path="/cadastro-lancamentos/:id" component={CadastroLancamentos}></Route>
            </Switch>
       </HashRouter>
    )
}

export default Rotas
