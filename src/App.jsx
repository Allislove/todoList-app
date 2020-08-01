import React from "react";
import "./App.css";
import { Button } from 'reactstrap';

import Modal from './components/modal';
import Loading from "./components/loading";
// import {Navbar} from './components/Navbar/navbar';


// import TextField from '@material-ui/core/TextField';
// import Modal from '@material-ui/core/Modal';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isRegisterActive: true, // Para hacer referencia cuando se este en Register o no
      loading: true,
      open: false,
      usuarios: [],
      tasks: []

    };
  }
    // El estado de loading sera true, maximo hasta 2 segundos, luego de ahi sera falso, entonces
    // cuando este sea falso, pasara a retornar la Aplicacion
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);

  }

  componentWillUnmount() {
    this.setState({loading: true})
  }


  mostrarCarga = () => {
    this.setState({ loading: true });
  };

  rand = () => {
    return Math.round(Math.random() * 20) - 10;
  };

  //Cuando presionen el boton o enlace de login quiero que me el estado se pase a true, entonces
    //cuando este sea true, muestrame el componente login
  // handleOpen = () => {
  //   this.setState({ open: true });
  // };
  //
  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  render() {
    // const { isRegisterActive } = this.state;

      // Se mostrara la opcion de carga maximo 2 segundos, luego sera false, ahi ya se mostrara
      // el return de abajo.
      if (this.state.loading === true) {
      return (
        <div className="App">
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="App">
          <div>
            {/*<Navbar />*/}
            <Modal />
            {/*<Register />*/}
            {/*<Login />*/}
          </div>
        </div>
      );
    }
  }
}

export default App;
