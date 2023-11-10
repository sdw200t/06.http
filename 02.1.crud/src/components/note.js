import React from 'react'

class Note extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div id={this.props.id} className="note">Запись № {this.props.id}
                <div className="note-message">
                        <div className="note__message__text">{this.props.message}
                        <div className="note-remove" onClick={(id) => this.props.removeMessage(this.props.id)}>&#10060;
                      </div>
                    </div>
                </div>
            </div>
          
        )
    }
}

export default Note