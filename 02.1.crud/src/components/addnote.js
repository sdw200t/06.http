import React from 'react';
import Note from './note';

const DEFAULT_MESSAGE = {
    message: ''
}

const serverURL = 'http://localhost:7777/notes';

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = { notes: [], noteObj: DEFAULT_MESSAGE };
    }

    componentDidMount() {
        this.getnoteList();
    }


    getnoteList() {
        let noteList = () => {
            fetch(serverURL)
                .then((responce) => responce.json())
                .then((notes) => this.setState({ notes }))
        }
        noteList();
    }

    changeSubmit(evt) {
        this.setState(() => ({
            noteObj: {
                message: evt.target.value
            }
        }))
    }

    addnote(evt) {
        evt.preventDefault();
        const addTonoteList = () => {
            fetch(serverURL, {
                method: 'POST',
                body: JSON.stringify(this.state.noteObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => this.getnoteList())
        }
        addTonoteList();
    }

    removeMessage(id) {
        //console.log(id);
        const removenoteList = () => {
            fetch(`${serverURL}/${id}`, {
                method: 'DELETE'
            })
                .then(() => this.getnoteList())
        }
        removenoteList();
    }

    render() {
        return (
            <React.Fragment>
                <div className="main">
                    <h1>Записи</h1>

                    <button className="refresh-button" onClick={() => this.getnoteList()}>&#8635;</button>
                    <form className="add-note" onSubmit={(evt) => this.addnote(evt)}>
                        <textarea placeholder="Введите сообщение" type="text" className="add-note-input" onChange={(evt) => this.changeSubmit(evt)} />
                        <button className="add-note-button"></button>
                    </form>
                </div>
                <div className="note__list">
                    {
                        this.state.notes.map(item => (
                            <Note key={item.id} id={item.id} message={item.message} removeMessage={(id) => this.removeMessage(id)} />
                        ))}
                </div>
            </React.Fragment>
        )
    }
}

export default AddNote