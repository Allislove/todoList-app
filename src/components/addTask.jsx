import React from 'react';
import DatePicker from 'react-datepicker'; // Importo el paquete para manejar las fechas
import "react-datepicker/dist/react-datepicker.css"; // css de las fechas del paquete datpic


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
                // llamo como props las tareas para recibirlas aqui
                // this.props.isLogged();
                console.log(datos);
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

    // handleChange = date => {
    //     this.setState({
    //         startDate: date
    //     });
    // };

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
                    <input name="content" type="text" placeholder="¿Qué necesitas hacer?" required /> <br/>
                    <DatePicker
                        selected={this.state.taskAdded.date}
                        onChange={this.handleChange}
                    /> <br/>
                    {/* El userId debe generarse solo */}
                    <button className="btn btn-success mt-2" type="submit">
                        Añadir #  {/*{this.props.tareas.results.length +1} */}
                    </button>
                    {/*<button className="btn btn-success mt-2" type="submit">*/}
                    {/*    Actualizar*/}
                    {/*</button>*/}
                </form>
            </div>


        );
    }
}