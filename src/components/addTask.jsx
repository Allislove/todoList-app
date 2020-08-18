import React from 'react';
import DatePicker from 'react-datepicker'; // Importo el paquete para manejar las fechas
import "react-datepicker/dist/react-datepicker.css"; // css de las fechas del paquete datpic
import { toast } from 'react-toastify'




import 'react-toastify/dist/ReactToastify.css';
toast.configure();


export default class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskAdded: {
                content: '',
                date: new Date(),
            },
        }
    }

    // Metodo post, para agregar valores a la API
    addTask = event => {
        event.preventDefault();
        event.target.reset();
        //Agregar un post
        let url = "https://academlo-todolist.herokuapp.com/tasks";
        let opciones = { // Creo una variable para manejar las opciones, de la peticion
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(this.state.taskAdded)
        };
        // ahora hago la peticion con fetch
        fetch(url, opciones)
            .then(response => {
                return response.json();
            })
            .then(datos => {
                if(datos.message === "La tarea se ha agregado correctamente en el sistema") {
                    return this.notifySucces();
                } else {
                    return this.notifyError("ERROR AL AÑADIR TAREA");
                }
                //console.log(datos);
            })
            .catch(error => {
                console.log(error);
            });
    };

    //Recibimos los datos del nuevo usuario que sera añadido.
    handleInput = event => {
        this.setState({
            taskAdded: {
                ...this.state.taskAdded,
                [event.target.name]: event.target.value
            }
        });
    };

    handleChange = (newDate) => {
        this.setState({
            taskAdded: {
                ...this.state.taskAdded,
                date: newDate,
            },
        });
    };

    obtenerDate = () => {
        let dateP = this.state.taskAdded.date;
    }



    notifySucces = (error) => {
        toast.success('🦄 Tarea agregada con éxito!', {
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
        toast.error('× Error al agregar la tarea!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }



    render() {
        return(
                <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 col-xs-10" ></div>
                                <div className="col-md-6 col-sm-6 col-xs-10">
                                    <form className="formulario" 
                                        onInput={this.handleInput} 
                                        onSubmit={this.addTask}>
                                        <h3> Agregar Tarea </h3>
                                        <div className="form-group mt-2 ">
                                            <input className="form-control" 
                                            name="content" 
                                            type="text" 
                                            placeholder="¿Qué necesitas hacer?" 
                                            required />
                                        </div>
                                        <div className="form-group">
                                            <DatePicker className="form-control"
                                                selected={this.state.taskAdded.date}
                                                onChange={this.handleChange}
                                            />
                                        </div>                                      
                                        <button className="btn btn-success mt-2" type="submit">
                                            Añadir #  {/*{this.props.tareas.results.length +1} */}
                                        </button>                  
                                    </form>
                            </div>
                        </div>
                </div>

        );
    }
}