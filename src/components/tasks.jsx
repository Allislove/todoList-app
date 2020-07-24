import React from 'react';


export default class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: {
                content: '',
                name: '',
                userId: '0'
            }
        }
    }

    registerUser = () => {
        let url = 'https://academlo-todolist.herokuapp.com/tasks';
        let options = {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(this.state.tasks)
        };

        fetch(url, options)
            .then(response => {
                return response.json;
            })
            .then(myJson => {
                console.log(myJson)
            })
            .catch(error=> {
                this.notifyError();
            });
    };


    render() {
        return(
            <div className="todos">
                <h3> Todos </h3>
            </div>

        );
    }
}