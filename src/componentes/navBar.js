import React from "react";
import NavBarItem from "./navBarItem";
import AuthService from "../app/service/authService";

const deslogar = () => {
  AuthService.removerUsuarioAutenticado();
}

const isUsuarioAutenticado = () => {
   return AuthService.isUsuarioAutenticado();
}

function NavBar() {

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
        <div className="container">
           <a href="#/home" className="navbar-brand">Minhas Finanças</a>
          <button className="navbar-toggler" type="button" 
                  data-toggle="collapse" data-target="#navbarResponsive" 
                  aria-controls="navbarResponsive" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
               <NavBarItem render={isUsuarioAutenticado()} href="#/home" label="Home"/>
               <NavBarItem render={isUsuarioAutenticado()} href="#/cadastro-usuarios" label="Usuários"/>
               <NavBarItem render={isUsuarioAutenticado()} href="#/consulta-lancamentos" label="Lançamentos"/>
               <NavBarItem render={isUsuarioAutenticado()} onClick={deslogar} href="#/login" label="Sair"/>
          </ul>
  
          </div>
        </div>
      </div>
  
    )
}

export default NavBar