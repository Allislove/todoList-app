import React from "react";
import "./App.css";
import Loading from "./components/loading";
import Login from "./components/login";
// import TextField from '@material-ui/core/TextField';
// import Modal from '@material-ui/core/Modal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      open: false,

    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);

    this.obtenerDatos();
  }


  obtenerDatos = () => {
    let url = "https://academlo-api-users.herokuapp.com/users";
    fetch(url)
        .then(response => response.json())
        .then(myJson => {
          this.setState({ usuarios: myJson.data });
          console.log(myJson);
        })
        .catch(error => console.log(error));
  };

  mostrarCarga = () => {
    this.setState({ loading: true });
  };

  rand = () => {
    return Math.round(Math.random() * 20) - 10;
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    if (this.state.loading === true) {
      return (
        <div className="App">
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Login />
        </div>
      );
    }
  }
}

export default App;
