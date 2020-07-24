import React from "react";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Tasks from './tasks';

toast.configure();
// const axios = require('axios').default;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {email: '', password: ''},
        loggedIn:false,


    };
  }


  notifySucces = () => {
      toast.success('🦄 Has sido logeado con éxito!', {
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

    loginUser = event => {
        event.preventDefault();
        let url = "https://academlo-todolist.herokuapp.com/login" ;
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
                this.notifySucces();
                this.loggedIn = true;

                // console.log("Inicio exitoso");
            })
            .catch(error => {
                console.log(error);
            });
    };





  render() {
    return (
        <div>
            <h3> Iniciar sesion  </h3>
            <form onInput={this.handleInput}
                  onSubmit={this.loginUser} onChange={this.estaLogeado}>

            <input name="email" type="email" placeholder="Email" /><br/>
            <input name="password" type="password" placeholder="Contraseña" /><br/>
            <input type="submit" value="Entrar" />
          </form>


        </div>
    );
  }
}
