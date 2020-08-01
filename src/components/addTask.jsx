import React from 'react';
import DatePicker from 'react-datepicker'; // Importo el paquete para manejar las fechas
import "react-datepicker/dist/react-datepicker.css"; // css de las fechas del paquete datpic


export default class AddTask extends React.Component {
    constructor(props) {
        super(props);
        // Con el primer estado guardamos las tareas en la API
        this.state = {
            startDate: new Date(),
            taskAdded: {},
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
                console.log(datos);
                // this.props.obtenerTareas();
            })
            .catch(error => {
                console.log(error);
            });
    };

    //Recibimos los datos del nuevo usuario que sera añadido.
    handleInput = event => {
        this.setState({
            taskAdded: {
                // generamos el nuevo estado, con un sprite operator, para que siempre que
                // agreguemos un dato al formulario, se vayan guardando todos los datos
                ...this.state.taskAdded,
                [event.target.name]: event.target.value
            }
        });
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    // datePicker = () => {
    // const [startDate, setStartDate] = useState(new Date());
    // return (
    //     <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
    //     );
    // };

    render() {
        return(
            <div>
                <form className="formulario" onInput={this.handleInput} onSubmit={this.addTask}>
                    <h3> Agregar Tarea </h3>
                    <input name="content" type="text" placeholder="¿Qué necesitas hacer?" /> <br/>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                    /> <br/>
                    {/* El userId debe generarse solo */}
                    <button className="btn btn-success mt-2" type="submit">
                        Añadir Tarea{this.state.taskAdded.length + 1}
                    </button>
                        {/*<input className="btn btn-success mt-2" type="submit"  value="Agregar tarea #" {this.state.taskAdded.length + 1} />*/}
                </form>
            </div>


        );
    }
}