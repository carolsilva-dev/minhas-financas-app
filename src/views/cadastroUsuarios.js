import React from "react"; 
import Card from "../componentes/card";
import { withRouter } from "react-router-dom"
import FormGroup from "../componentes/form-group";
import UsuarioService from "../app/service/usuarioService";
import { mensagemSucesso, mensagemErro } from '../componentes/toastr.js'

class CadastroUsuario extends React.Component{
   
    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }


    cadastrar = () => {

         const {nome, email, senha, senhaRepeticao} = this.state
         const usuario = {nome, email, senha, senhaRepeticao }

         try{
            this.service.validar(usuario);
         }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg))
         }
         

        this.service.salvar(usuario)
            .then( response => {
               mensagemSucesso('Usuário cadastrado com sucesso. Faça o login para acessa o sistema')
               this.props.history.push('/login')
            }).catch( error => {
                mensagemErro(error.response.data)
            })

    }

    cancelar = () => {
        this.props.history.push('/login')
    }


    render() {
        return(
            <Card title="Cadastro de Usuario">
            <div className="row">
               <div className="col-lg-12">
                   <div className="bs-component">
                     <FormGroup label="Nome: *" htmlFor="inputNome">
                        <input type="text"
                               id="inputNome"
                               className="form-control"
                               name="nome"
                               onChange={e => this.setState({nome: e.target.value}) } />
                     </FormGroup>
                     <FormGroup label="Email: *" htmlFor="inputEmail">
                        <input type="email"
                               id="inputEmail"
                               className="form-control"
                               name="email"
                               onChange={e => this.setState({email: e.target.value}) } />
                     </FormGroup>
                     <FormGroup label="Senha: *" htmlFor="inputSenha">
                        <input type="password"
                               id="inputSenha"
                               className="form-control"
                               name="senha"
                               onChange={e => this.setState({senha: e.target.value}) } />
                     </FormGroup>
                     <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                        <input type="password"
                               id="inputRepitaSenha"
                               className="form-control"
                               name="senha"
                               onChange={e => this.setState({senhaRepeticao: e.target.value}) } />
                     </FormGroup>
                     <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                     <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                  </div>      
                </div>  
              </div>  
           </Card>
        )
    }
}

export default withRouter (CadastroUsuario)