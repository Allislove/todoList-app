import React from "react";
import Register from "./register";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formLogin: {}
    };
  }

  loginUser = event => {
    event.preventDefault();
    let url = "https://academlo-todolist.herokuapp.com/login";
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(this.state.formLogin)
    };

    fetch(url, options)
      .then(response => {
        return response.json;
      })
      .then(myJson => {
        this.notify();
        // console.log("Inicio exitoso");
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.obtenerDatos()
  }

  //Obtengo los usuarios que esten actualmente en el registro. y si es asi, mandalos al array de
  // formLogin
  obtenerDatos = () => {
    let url = "https://academlo-api-users.herokuapp.com/users";
    fetch(url)
        .then(response => response.json())
        .then(myJson => {
          this.setState({ formLogin: myJson.data });
          console.log(myJson);
        })
        .catch(error => console.log(error));
  };

    notify = () => {
      if(this.state.formLogin.password === true) {
        toast.success('🦄 Genial estas dentro!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

}


  handleInput = event => {
    this.setState({
      formLogin: {
        ...this.state.formLogin,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    return (
      <div>
        <form onInput={this.handleInput} onSubmit={this.loginUser}>
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Contraseña" />
          <input type="submit" />
        </form>
        <Register />
      </div>
    );
  }
}
