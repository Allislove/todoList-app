import React from "react";
import Login from "./login";
import Register from "./register";
// Aqui falta importa los tasks, que sera lo que vamos a mostrar cuando el usuario este logeado

export default class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: "login"
        };
    }

    changeToLogin = () => {
        this.setState({ isLoggedIn: "login" });
    };

    changeToRegister = () => {
        this.setState({ isLoggedIn: "register" });
    };

    // Esta funcion no esta en uso en el switch, aqui ira las tareas y demas, ya que pasa cuando el usuario este logeado
    
    login = () => {
        this.setState({ isLoggedIn: "app" });
    };

    render() {
        switch (this.state.isLoggedIn) {
            // Cuando este en login, podra ir a registro
            case "login":
                return <Login comeBackToRegister={this.changeToRegister} />;
            case "register":
                return <Register comeBackToLogin={this.changeToLogin} />;
            default:
                return <Login />;
        }
    }
}
