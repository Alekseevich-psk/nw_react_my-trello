import React from 'react';

class TaskContent extends React.Component {

    constructor(props) {
        super(props);

        this.onDbClickHandler = this.onDbClickHandler.bind(this);
        this.onHandlerClick = this.onHandlerClick.bind(this);

        this.state = {
            showTextArea: false,
            textContent: props.task.text
        }

    }

    onHandlerClick() {
        this.setState({
            showTextArea: false
        })

        this.props.updateTask({
            id: this.props.task.id,
            text: this.state.textContent
        })
    }

    getContent(event) {
        this.setState({
            textContent: event.target.value
        })
    }

    onDbClickHandler(event) {
        clearTimeout(this.timer);

        if (event.detail === 1) {
            this.timer = setTimeout(this.props.onClick, 200)
        } else if (event.detail === 2) {
            this.setState({
                showTextArea: true
            })
        }
    }

    render() {
        return (
            <div className="popup__wrapper">
                <div
                    style={{ display: this.state.showTextArea ? 'none' : 'block' }}
                    className="popup__text"
                    onClick={this.onDbClickHandler}>
                    {this.props.task.text}
                </div>
                <div className={"popup__text-area-wrap " + (this.state.showTextArea ? "show" : "hidden")}>
                    <textarea
                        onChange={this.getContent.bind(this)}
                        className="popup__text-area"
                        defaultValue={this.props.task.text}
                    ></textarea>
                    <button className='popup__btn' onClick={this.onHandlerClick}>Сохранить</button>
                </div>
            </div>
        )
    }
}

export default TaskContent;