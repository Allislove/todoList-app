import React from 'react';
import DatePicker from 'react-datepicker'; // Importo el paquete para manejar las fechas
import "react-datepicker/dist/react-datepicker.css"; // css de las fechas del paquete datpic


export default function EditTask (props){
    const {content, date = new Date() } = props.todo;


    return (
        <div className="container-fluid mt-5 p-md-2">
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-12" ></div>
                    <div className="col-md-4 col-sm-4 col-xs-12" >
                        <form onSubmit={props.updatedTodo}  onInput={props.inputTodoToEdit}>
                            <h3>Editar tarea</h3>
                                <div className="form-group" >
                                    <input className="form-control"
                                            name="content"
                                        type="text"
                                        placeholder="Contenido"
                                        value={content}
                                        required
                                        />
                                </div>
                                <div className="form-group">
                                    <DatePicker className="form-control"
                                        selected={props.selected}
                                        onChange={props.onChange}
                                    />
                                </div>

                                         <button className="btn btn-secondary mt-2" type="submit">
                                        Actualizar tarea  {/*{this.props.tareas.results.length +1} */}
                                        </button> 
                                     
                       </form>
                    </div>
                </div>
            </div>


    );
}