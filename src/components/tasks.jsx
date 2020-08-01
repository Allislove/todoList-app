import React from 'react';
import axios from 'axios';
import AddTasks from './addTask';


export default class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ediTask: {
                content: '',
                date: '',
            },
            tareas: {},

        }
    }

    componentDidMount(){
        this.obtenerTareas();
    }

    obtenerTareas = () => {
        const tareas = 'https://academlo-todolist.herokuapp.com/tasks';
        fetch(tareas)
            .then(response => response.json())
            .then(myJson => {
                this.setState({ tareas: myJson.data });
                console.log(myJson);
            })
            .catch(error => console.log(error));
    }; 

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

    render() {
        return(
            <div className="todos">

            {/*  En el componente AddTask puedo agregarle props por si necesito*/}
            <AddTasks />

                <h3> TAREAS  </h3>
                {this.state.tareas.map((task) => {
                    return (
                        <div className="card-group">
                            <div className="card mt-4 ml-2 bg-dark text-white">
                                <div className="card-body">
                                    <mark > {task.results} </mark>
                                    {/*<input  className="btn btn-light mr-3" type="submit" value="Editar"*/}
                                    {/*        onClick={() => {this.editTask(task);}}  />*/}
                                    {/*<input className="btn btn-danger" type="submit" value="Borrar"*/}
                                    {/*       onClick={() => {this.deleteTask(task.id);}}/>*/}
                                </div>
                            </div>
                        </div>
                    );
                })}
                
            </div>

        );
    }
}