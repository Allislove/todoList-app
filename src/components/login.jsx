import React from "react";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Tasks from './tasks';

toast.configure();

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {email: '', password: ''},
        isLoggedIn: false,
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

    notifyError = () => {
        toast.error('× Error intentando iniciar sesión!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    loginUser = event => {
        event.preventDefault();
        event.target.reset();
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
                return response.json();
            })
            .then(myJson => {
                if(myJson.message === "Email o contraseña incorrectas") {
                    return this.notifyError();
                } if (myJson.results === "Las credenciales son correctas") {
                    // this.setState.isLoggedIn = true;
                    return this.notifySucces();
                }
            })
            .catch(error => {
                // return this.notifyError();
                console.log(error);
            });
    };





    handleInput = event => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    };

    /*isLogged(props) {
        const LoggedIn = props.isLoggedIn;
        if (LoggedIn) {
            return <Tasks />;
        }
    } */

    // handleSubmit = event => {
    //     alert('Bienvenido: ' + this.state.user.name);
    //     event.preventDefault();
    // }
    // onSubmit={this.handleSubmit}



  render() {
      const ref = "#";
    return (
        <div className={"container"}>
            <h3> Iniciar sesion  </h3>
            <form onInput={this.handleInput}
                  onSubmit={this.loginUser}>

            <input name="email" type="email" placeholder="Email" /><br/>
            <input name="password" type="password" placeholder="Contraseña" /><br/>
            <input className="btn btn-secondary mt-1" type="submit" value="Entrar"
            /> <br/>

                <a onClick={this.props.comeBackToRegister}
                   href={ref}>
                    ¿No tienes cuenta aún? Registrate. </a>

          </form>

          <div> 
          <Tasks /> 
    
          </div>
           

        </div>
    );
  }
}
