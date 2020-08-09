import React from 'react';
import AddTasks from './addTask';
import EditTask from './editTask';


export default class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskEdited: {content: '', date: ''},
            tareas: [],
        };
    }

    componentDidMount(){
        this.obtenerTareas();
    }

    obtenerTareas = () => {
        const tareas = 'https://academlo-todolist.herokuapp.com/tasks';
        fetch(tareas)
            .then(response => response.json())
            .then(myJson => {
                this.setState({ tareas: myJson.results });
                console.log(myJson);
            })
            .catch(error => console.log(error));
    }; 

    deleteTask = (id) => {
      let todoUrl = "https://academlo-todolist.herokuapp.com/tasks/" + id;
      let todoId = {
        method: "DELETE",
      };

      fetch(todoUrl, todoId)
          .then(response => {
            return response.json;
          })
          .then(datos => {
            console.log(datos);
              this.obtenerTareas(); // Al borrar obtenemos nuevamente las tareas

          })
          .catch(error => {
            console.log(error);
          });
    }

    // Para actualizar la tarea, cuando presionen el boton de actualizar
    updateTodo = (event) => {
        event.preventDefault();
      let url = 'https://academlo-todolist.herokuapp.com/tasks/' + this.state.taskEdited._id;
      fetch(url, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(this.state.taskEdited)
      })
          .then(response => response.json())
          //Volvemos y obtenemos la tarea cuando el  usuario actualice.
          .then(results => this.obtenerTareas())
          .catch(error => console.log(error));
    }


    /* Le mando el estado actual de la tarea que ha seleccionado al nuevo estado para
           editarla */
    editTask = (todo) => {
        this.setState({taskEdited: todo});
    };


    handleInputEdiTodo = event => {
        this.setState({
            taskEdited : {
                ...this.state.taskEdited,
                [event.target.name]: event.target.value
            }
        });

    };




    render() {
        // console.log(this.state.tareas.results)
        const ref = "#";
        return(
            <div className="todos"  >
                <div>
                    <AddTasks mostrarTareas={this.state.tareas} />

                    <input className="btn btn-danger" type="submit" value="Cerrar Sesión"
                           onSubmit={() => this.props.isLogged() } />
                </div>

                <div>
                    {/* en el primer prop, paso el estado que estare editando
                        el segundo viene y actualiza el estado cuando el usuario da en el boton
                         de actualizar
                         el tercero lee los datos que se escriban en el input*/}
                    <EditTask todo={this.state.taskEdited}
                              updatedTodo={this.updateTodo}
                              inputTodoToEdit={this.handleInputEdiTodo}
                    />
                </div>

                 {this.state.tareas.map((tarea, i) => {
                    return (
                        <div className="card-group" >
                            <div className="card mt-4 ml-2 bg-dark text-white">
                                <div className="card-body">
                                     <mark key={i}>{tarea.content}</mark> <br/>
                                    <mark>{tarea.date}</mark> <br/>
                                        <input  className="btn btn-light mr-3"
                                                type="submit"
                                                value="Editar"
                                                onClick={() => {this.editTask(tarea);}}

                                        />
                                        <input className="btn btn-danger" type="submit" value="Borrar"
                                               onClick={() => {this.deleteTask(tarea._id);}}/>


                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        );
    }
}