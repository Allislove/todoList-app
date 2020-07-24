import React from "react";
import "./App.css";
import Loading from "./components/loading";
import Login from "./components/login";
import Register from "./components/register";


// import TextField from '@material-ui/core/TextField';
// import Modal from '@material-ui/core/Modal';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      open: false,
      usuarios: [],
      todos: {}

    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);

  }


  // deleteTodo = (id) => {
  //   let todoUrl = "https://academlo-todolist.herokuapp.com/tasks/id";
  //   let todoId = {
  //     method: "DELETE",
  //   };
  //
  //   fetch(todoUrl, todoId)
  //       .then(response => {
  //         return response.json;
  //       })
  //       .then(datos => {
  //         console.log(datos);
  //         // this.obtenerTareas()
  //
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  // }

  // // Para actualizar la tarea, cuando presionen el boton de actualizar
  // updateTodo = (event) => {
  //   event.preventDefault();
  //   let url = 'https://academlo-todolist.herokuapp.com/tasks/id';
  //   fetch(url, {
  //     method: 'PUT',
  //     headers: {
  //       'content-type': 'application/json; charset=UTF-8'
  //     },
  //     body: JSON.stringify(this.state.todos)
  //   })
  //       .then(response => response.json())
  //       .then(results => this.obtenerDatos())
  //       .catch(error => console.log(error));
  // }
  //
  // // Creo un metodo con una funcion flecha, en el callback le paso el usuario del usuario actual
  // editTodo = user => {
  //   /* actualizamos el estado userEdited, con los valores de user, para
  //   poder modificar asi luego sus atributos */
  //   this.setState({userEdited: user});
  // };

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
          <Register />
          <Login />
        </div>
      );
    }
  }
}

export default App;
