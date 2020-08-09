import React from "react";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {email: '', password: ''},

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
        toast.error('× Error: Revisa tus credenciales!', {
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
                } else{
                    // this.setState({ isLoggedIn: true });
                    this.notifySucces();
                    this.props.isLogged();
                }
            })
            .catch(error => {
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

    // isLogged = () => {
    //     const LoggedIn = this.state.isLoggedIn;
    //     if (LoggedIn === true) {
    //         return <Tasks />;
    //     }
    // }

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

            <input name="email" type="email" placeholder="Email" required /><br/>
            <input name="password" type="password" placeholder="Contraseña" required /><br/>
            <input className="btn btn-secondary mt-1" type="submit" value="Entrar"
            /> <br/>

                <a onClick={this.props.comeBackToRegister}
                   href={ref}>
                    ¿No tienes cuenta aún? Registrate. </a>

          </form>
        </div>
    );
  }
}
