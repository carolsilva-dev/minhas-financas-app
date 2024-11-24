import React from "react";
import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import Rotas from "./rotas";
import NavBar from "../componentes/navBar";
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/themes/nova-accent/theme.css';
import 'primereact/resources/themes/nova-alt/theme.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class App extends React.Component {
 render(){
  return(
      <>
        <NavBar/>
      
          <div className="container">
             <Rotas/>
         </div>
      </>
     )
   }
}

export default App;
