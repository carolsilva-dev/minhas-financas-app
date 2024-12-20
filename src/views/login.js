import React from "react";
import Card from '../componentes/card'
import FormGroup from "../componentes/form-group";
import { withRouter} from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localstorageService.js";
import { mensagemErro } from '../componentes/toastr.js'

class Login extends React.Component {
     state = {
         email: "" ,
         senha: "",
     }

     constructor() {
         super();
         this.service = new UsuarioService();
     }

     entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then ( response => {
           LocalStorageService.adicionarItem('_usuario_logado', response.data)
           this.props.history.push("/home")
        }).catch( erro => {
            mensagemErro(erro.response.data)
        })
     }

     prepareCadastrar = () => {
        this.props.history.push("/cadastro-usuarios")
     }

    render() {
      return(
            <div className="row">
               <div className="col-md-6 offset-md-3">
                 <div className="bs-docs-section"></div>
                    <Card title="Login">
                      <div className="row">
                           <div className="col-lg-12">
                              <div className="bs-component">
                                  <fieldset>
                                     <FormGroup label="Email *" htmlFor="exampleInputEmail1">
                                        <input type="email" 
                                            value={this.state.email}
                                            onChange={e => this.setState({email: e.target.value})}
                                            className="form-control" id="exampleInputEmail1"
                                            aria-describedby="emailHelp" placeholder="Digite o Email">
                                        </input>
                                     </FormGroup>
                                     <br></br> 
                                     <FormGroup label="Senha *" htmlFor="exampleInputPasswod1">
                                       <input type="password"
                                            value={this.state.senha}
                                            onChange={e => this.setState({senha: e.target.value})}
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Password">
                                       </input>
                                    </FormGroup>
                                    <br></br>
                                    <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                    <button onClick={this.prepareCadastrar} className="btn btn-danger">Cadastrar</button>
                                  </fieldset>
                               </div>
                           </div>
                       </div>
                    </Card>
                </div>    
            </div> 
       )    
    }
}

export default withRouter(Login) 