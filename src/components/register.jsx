import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

toast.configure()


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: {}
    };
  }

  // componentDidMount() {
  //   this.addUser()
  // }

  addUser = () => {
    let url = "https://academlo-todolist.herokuapp.com/register";
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(this.state.usuarios)
    };

    fetch(url, options)
      .then(response => {
        return response.json;
      })
      .then(() => {
      })
      .then(myJson => {
        this.notify();
        console.log("Registro exitoso");

      })
      .catch(error=> {
        this.notifyError();
      });
  };

  notify = () => {
      toast.success('🦄 Has sido registrado con exito!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

  }

  notifyError = () => {
    toast.error('🦄 Hay un error en el registro!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }

  handleInput = event => {
    this.setState({
      usuarios: {
        ...this.state.usuarios,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    return (
      <div>
        <form onInput={this.handleInput} onSubmit={this.addUser}>
          <input name="name" type="text" placeholder="Nombre" />
          <input name="lastname" type="text" placeholder="Apellido" />
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Contraseña" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
