import React from "react";
import Login from "./login";
import Register from "./register";
import Tasks from "./tasks";
// import AddTask from "./addTask";

// Aqui falta importa los tasks, que sera lo que vamos a mostrar cuando el usuario este logeado

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
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

    // funcion que se muestra cuando el usuario se loguee

    userIsLoggedShowTasks = () => {
        this.setState({ isLoggedIn: "tasks" });
    }


    render() {
        switch (this.state.isLoggedIn) {
            // Cuando este en login, podra ir a registro
            case "login":
                return <Login  isLogged={this.userIsLoggedShowTasks} comeBackToRegister={this.changeToRegister} />;
            case "register":
                return <Register comeBackToLogin={this.changeToLogin} />;
            case "tasks":
                return <Tasks />;
            default:
                return <Login />;
        }
    }
}
