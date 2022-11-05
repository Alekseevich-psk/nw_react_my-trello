import React from 'react';

class TaskItem extends React.Component {

    constructor(props) {
        super(props);

        this.updateCoords = this.updateCoords.bind(this);

        this.state = {
            content: props.task.text,
            timer: null,
            showInput: false,
            title: props.task.title,
            inputValue: props.task.title,
            style: null,
            mouseMove: false,
            coords: {
                x: null,
                y: null
            }
        }
    }

    handleKeyPress(event) {
        if (event.charCode == 13) {
            this.setState({
                showInput: false,
            })
            this.props.editTask(event.target.value, this.props.task.id);
        }
    }

    onDbClickHandler(event) {
        clearTimeout(this.timer);

        if (event.detail === 1) {
            this.timer = setTimeout(this.props.onClick, 200)
        } else if (event.detail === 2) {
            if (this.state.inputValue !== this.props.task.title) {
                this.setState({
                    inputValue: this.props.task.title
                })
            }
            this.setState({
                showInput: true
            })
        }
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    onClickHandler() {
        this.props.editTask(null, this.props.task.id)
    }

    updateCoords(event) {
        const style = {
            position: 'fixed',
            with: '200px',
            zIndex: '1000',
            top: event.clientY - (event.target.getBoundingClientRect().height / 2),
            left: event.clientX - (event.target.getBoundingClientRect().width / 2),
        }
        this.setState({
            style: style
        })
    }

    onMouseMove(value) {
        if (value) {
            window.addEventListener('mousemove', this.updateCoords)
        } else {
            window.removeEventListener('mousemove', this.updateCoords)
            window.onmouseup = null;
        }
    }

    handlerOnMouseDown() {
        this.onMouseMove(true);
    }

    handlerOnMouseUp(event) {
        this.props.dragAndDrop({
            coord: {
                taskId: this.props.task.id,
                catId: this.props.task.catId,
                y: event.clientY - (event.target.getBoundingClientRect().height / 2),
                x: event.clientX - (event.target.getBoundingClientRect().width / 2),
            }
        });
        this.setState({
            style: null
        })
        this.onMouseMove(false)
    }

    render() {
        return (
            <div
                style={this.state.style}
                className="task-list__task task"
                onMouseDown={this.handlerOnMouseDown.bind(this)}
                onMouseUp={this.handlerOnMouseUp.bind(this)}
            >
                <div className="task__body">
                    <div className="task__preview">
                        <div style={{ display: this.state.showInput ? 'none' : 'block' }} className="task__sub-title" onClick={this.onDbClickHandler.bind(this)}>{this.props.task.title}</div>
                        <div className={"task__input input" + " " + (this.state.showInput ? "show" : "hidden")}>
                            <input type="text"
                                onKeyPress={this.handleKeyPress.bind(this)}
                                value={this.state.inputValue}
                                onChange={this.handleChange.bind(this)} />
                        </div>
                        <button className="task__btn-edit-task" onClick={this.onClickHandler.bind(this)}></button>
                    </div>
                    <div className="task__inner">
                        <div className="task__date">{this.props.task.date}</div>
                        <div className="task__text-area">
                            {this.state.title}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskItem;