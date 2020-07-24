import React from "react";
import 'react-toastify/dist/ReactToastify.css';
// import Login from "./login";
import axios from 'axios';
import {toast} from "react-toastify";

toast.configure()


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: ''
      }
    };
  }


  onSubmitUser = (event) => {
    event.preventDefault();
    let url = 'https://academlo-todolist.herokuapp.com/register';
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(this.state.user)
    };

    fetch(url, options)
      .then(response => {
        return response.json;
      })
      .then(myJson => {
        this.notify();
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
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  };


  render() {
    return (
      <div className="userToRegister ">
        <h3> Crear cuenta </h3>
        <form onInput={this.handleInput}
              onSubmit={this.onSubmitUser}>

          <input name="name" type="text" placeholder="Nombre"  required /> <br/>
          <input name="lastname" type="text" placeholder="Apellido" required /> <br/>
          <input name="email" type="email" placeholder="Email" required /> <br/>
          <input name="password" type="password" placeholder="Contraseña" required /> <br/>

          <div className="createAccount">
            <input type="submit" value="Registrarse"/> <br/>
            <small>Ya tienes una cuenta? Logeate. </small>
          </div>

        </form >
      </div>
    );
  }
}
