import React from 'react';
import AddTasks from './addTask';
import EditTask from './editTask';
import Form from 'react-bootstrap/Form'
import moment from 'moment';
import {toast} from "react-toastify";
toast.configure()


moment.locale();


export default class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskEdited: {content: '', date: ''},
            tareas: [],
            ByName: "",
            type: "",
            tasksFiltered: [],
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


     Terminada = () => {
        //Obtenemos el checkbox
        let checkBox = document.getElementById("tareaTerminada");      
        // Si el checkbox esta marcado como verdadero haz lo siguiente
        if (checkBox.checked == true){
            return this.workDone();
        } 
      }


      workDone = () => {
        toast.success('🦄 Genial buen trabajo!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
  
    }
  

        // Filtrar por contenido 
        filterTasks = (event) => {
          this.setState({
            tasksFiltered: event.target.value
          });
          console.log(this.state.tasksFiltered);
        };

        // Filtrar por fecha
        onChangeSelect = (tarea) => {
          let today = moment(); //Fecha de hoy usando moment
          let startOfWeek = moment().startOf("week");
          let endOfWeek = moment().endOf("week");
          let startOfNextWeek = moment(endOfWeek).add(1, "seconds");
          let endOfNextWeek = moment(endOfWeek).add(7, "days");
          switch (this.state.type) {
            case "today":
              if (moment(tarea.date).isSame(today, "day")) {
                return true;
              }
              return false;
            case "week":
              if (moment(tarea.date).isBetween(startOfWeek, endOfWeek)) {
                return true;
              }
              return false;
            case "nextWeek":
              if (moment(tarea.date).isBetween(startOfNextWeek, endOfNextWeek)) {
                return true;
              }
              return false;
            
            default:
              return true;
          }
        };
  



    render() {
        // console.log(this.state.tareas.results)
        const ref = "#";
        return(
            <div className="container mt-5">
                          <h4> Buscar tarea </h4>
                        <Form.Control  
                            type='text'
                             
                            placeholder="Buscar tarea" 
                            onChange={this.filterTasks} />
                          <select
                              onChange={(event) => this.setState({ type: event.target.value })} >                                                                                                 >
                              <option value="all">Todas</option>
                              <option value="today">Hoy</option>
                              <option value="week">De la semana</option>
                              <option value="nextWeek">Proxima semana</option>
                          </select>
                <div className="row " >
                    <div className="col"> 
                        <AddTasks mostrarTareas={this.state.tareas} />
                                
                    </div>
                    <div className="col">
                    {/* en el primer prop, paso el estado que estare editando
                        el segundo viene y actualiza el estado cuando el usuario da en el boton
                         de actualizar
                         el tercero lee los datos que se escriban en el input*/}
                    <EditTask todo={this.state.taskEdited}
                              updatedTodo={this.updateTodo}
                              inputTodoToEdit={this.handleInputEdiTodo}
                    />
                    </div>
                </div>

                {this.state.tareas
              .filter((tarea) => {
                return tarea.content === ""
                  ? true
                  : tarea.content.includes(this.state.tasksFiltered);
              })
              .filter((tarea) => this.onChangeSelect(tarea))
              .map((tarea, i) => {
                    return (
                        <div className="d-flex flex-column row row-cols-md-3 align-content-center " >
                            <div className="card mt-4 bg-dark text-white row">
                                <div className="card-header">
                                     <mark key={i}>{tarea.content}</mark> <br/>
                                    <mark>{tarea.date}</mark> <br/>
                                    <input type="checkbox" className="m-3" id="tareaTerminada"
                                    onClick={() => {this.Terminada();}}
                                    /> 
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