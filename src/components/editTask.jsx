import React from 'react';
import DatePicker from 'react-datepicker'; // Importo el paquete para manejar las fechas
import "react-datepicker/dist/react-datepicker.css"; // css de las fechas del paquete datpic


export default function EditTask (props){
    const {content, date = new Date() } = props.todo;


    return (
        <div >
            <form onSubmit={props.updatedTodo}  onInput={props.inputTodoToEdit}>
                <div className="align-items-center form-group">
                    <h3>Editar tarea</h3>
                    <div>
                        <input name="content"
                               type="text"
                               placeholder="Contenido"
                               value={content}
                               required
                            />

                    </div>
                    <div>
                        {/*<input name="date"*/}
                        {/*       type="date"*/}
                        {/*       placeholder="Fecha"*/}
                        {/*       value={date}*/}
                        {/*       required*/}
                        {/*/>*/}

                        <DatePicker
                            selected={props.selected}
                            onChange={props.onChange}
                        />

                        <br/>
                    </div>

                    <div>
                        <input className="btn btn-secondary mt-2"
                               type="submit"
                               value="Actualizar tarea" />
                    </div>
                </div>
            </form>
        </div>


    );
}