import React from "react";
import { withRouter } from 'react-router-dom';
import Card from "../../componentes/card";
import FormGroup from "../../componentes/form-group";
import SelectMenu from "../../componentes/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";
import { mensagemErro, mensagemSucesso } from '../../componentes/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamentos extends React.Component {

   state = {
      ano: '',
      mes: '',
      tipo: '',
      descricao: '',
      showConfirmDialog: false,
      lancamentoDeletar: {},
      lancamentos: []
   }

   constructor() {
       super();
       this.service = new LancamentoService();
   }

   buscar = () => {
       if(!this.state.ano){
          mensagemErro('O preenchimento do campo Ano é obrigatório');
          return false;
       }

       const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

       const lancamentoFiltro = {
         ano: this.state.ano,
         mes: this.state.mes,
         tipo: this.state.tipo,
         descricao: this.state.descricao,
         usuario: usuarioLogado.id
       };

       this.service
           .consultar(lancamentoFiltro)
           .then(resposta => {
               this.setState({ lancamentos: resposta.data });
           })
           .catch(error => {
              console.log(error);
           });
   }

   editar = (id) => {
      this.props.history.push(`/cadastro-lancamentos/${id}`);
   }

   

   abrirConfirmacao = (lancamento) => {
    // Verifica se o lançamento contém o ID e o define no estado
    if (lancamento && lancamento.id) {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento });
    } else {
        mensagemErro('Lançamento inválido.');
    }
}

   cancelarDelecao = () => {
      this.setState({ showConfirmDialog: false, lancamentoDeletar: {} });
   }

   deletar = () => {
    const { lancamentoDeletar } = this.state;

    // Verifique se o lançamentoDeletar contém um ID válido
    if (lancamentoDeletar && lancamentoDeletar.id) {
        this.service  
            .deletar(lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos.filter(l => l.id !== lancamentoDeletar.id);
                this.setState({ lancamentos, showConfirmDialog: false, lancamentoDeletar: {} });
                mensagemSucesso('Lançamento deletado com sucesso');
            })
            .catch(error => {
                mensagemErro('Ocorreu um erro ao tentar deletar o lançamento');
            });
            } else {
                mensagemErro('Erro ao deletar: ID do lançamento não encontrado.');
          }         
}

     preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-lancamentos')
     }

 
     alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = [...this.state.lancamentos]; // Cópia do array de lançamentos
                const index = lancamentos.findIndex(l => l.id === lancamento.id); // Busca o índice correto
                
                if (index !== -1) {
                    lancamentos[index] = { ...lancamento, status }; // Atualiza o status no lançamento
                    this.setState({ lancamentos }); // Atualiza o estado
                    mensagemSucesso("Status atualizado com sucesso");
                }
            })
            .catch(error => {
                mensagemErro("Ocorreu um erro ao tentar atualizar o status do lançamento");
            });
    };
    

    render() {
         const meses = this.service.obterListaMeses();
         const tipos = this.service.obterListaTipos();

         const confirmDialogFooter = (
            <div>
               <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} /> 
               <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} /> 
           </div>
      );

      return (
         <Card title="Consulta Lançamentos">
           <div className="row">
               <div className="col-md-6"> 
                   <FormGroup htmlFor="inputAno" label='Ano: *'> 
                         <input type="text"
                                className="form-control" 
                                id="inputAno" 
                                value={this.state.ano}
                                onChange={ e => this.setState({ ano: e.target.value })}
                                placeholder="Digite o Ano"/>
                     </FormGroup>
                     <br />
                     <FormGroup htmlFor="inputMes" label="Mês: ">
                          <SelectMenu id="inputMes" 
                                      value={this.state.mes}
                                      onChange={ e => this.setState({ mes: e.target.value })}
                                      className="form-control" 
                                      lista={meses}/>
                     </FormGroup>
                     <br />
                     <FormGroup htmlFor="inputDesc" label="Descrição: ">
                               <input type="text" 
                                      value={this.state.descricao}
                                      id="inputDesc"
                                      onChange={ e => this.setState({ descricao: e.target.value })}
                                      className="form-control" 
                                      placeholder="Digite a descrição"/>
                     </FormGroup>
                     <br />
                     <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                          <SelectMenu id="inputTipo"
                                     value={this.state.tipo}
                                     onChange={ e => this.setState({ tipo: e.target.value })}
                                     className="form-control" 
                                     lista={tipos}/>
                     </FormGroup>
                     <br />
                     
                     <button onClick={this.buscar} type="button" className="btn btn-success"><i className= "pi pi-search"></i> Buscar</button>
                     <button onClick={this.preparaFormularioCadastro} type="button" className="btn btn-danger"><i className= "pi pi-plus"></i> Cadastrar</button>
                 </div>
             </div>
             <br/>
             <div className="row">
                 <div className="col-md-12">
                      <div className="bs-component">
                           <LancamentosTable lancamentos={this.state.lancamentos}
                                             deleteAction={this.abrirConfirmacao}
                                             editAction={this.editar}
                                             alterarStatus={this.alterarStatus}
                            />    
                      </div>
                  </div>
              </div>
              <div>      
                <Dialog header="Confirmação" 
                   visible={this.state.showConfirmDialog}
                   style={{ width: '50vw' }} 
                   footer={confirmDialogFooter}
                   modal={true}
                   onHide={this.cancelarDelecao}>
                      <p className="m-0">
                         Confirma a exclusão desse lançamento?
                     </p>
                </Dialog>
              </div>
         </Card>
      );
   }
}

export default withRouter(ConsultaLancamentos);
