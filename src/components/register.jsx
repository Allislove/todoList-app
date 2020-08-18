import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {toast} from "react-toastify";
toast.configure()


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        user: {name: '',
            lastname: '',
            email: '',
            password: ''
      }
    };
  }


  onSubmitUser = (event) => {
    event.preventDefault();
    //Para borrar los datos del formulario apenas se envien.
      event.target.reset();
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
        return response.json();
      })
      .then(myJson => {
        if (myJson.message === "El usuario ha sido registrado correctamente") {
          return this.notifySucces();
        } else {
          return this.notifyError();
        }

      })
      .catch(error=> {
        this.notifyError();
      });
  };



  notifySucces = () => {
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
    toast.error('🦄 El email es incorrecto!', {
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
        [event.target.name]: event.target.value,

      }
    });
  };


    // Cuando presionen el boton o enlace de login quiero que me el estado se pase a true, entonces
    // cuando este sea true, muestrame el componente login
    handleOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };




  render() {
    const ref = "#";
    return (
      <div className="container-fluid mt-5 border-blue">
                <h3> Crear cuenta </h3>
        <div className="row">
        <div className="col-md-4 col-sm-4 col-xs-12" ></div>
        <div className="col-md-4 col-sm-4 col-xs-12" > 
              <form onInput={this.handleInput}
                      onSubmit={this.onSubmitUser}>
                      <div className="form-group" >
                        <input  className="form-control" 
                            name="name" 
                            type="text" 
                            placeholder="Nombre" 
                            required />
                      </div>
                  
                      <div className="form-group" >
                        <input className="form-control" name="lastname" type="text" placeholder="Apellido" required />
                      </div>

                      <div className="form-group" >
                      <input className="form-control" name="email" type="email" placeholder="Email" required />
                      </div>

                      <div className="form-group" > 
                        <input className="form-control" name="password" type="password" placeholder="Contraseña" required />
                      </div>

                      <div className="createAccount">
                        <input className="btn btn-secondary mt-1" type="submit" value="Registrarse"/> 
                      </div>

                  <a onClick={this.props.comeBackToLogin}
                    href={ref}>
                    ¿Ya tienes una cuenta? Logeate. </a>

                </form >
            </div>
          </div>
      </div>
    );
  }
}
