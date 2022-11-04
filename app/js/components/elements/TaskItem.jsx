import React from 'react';

class TaskItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: props.task.text,
            timer: null,
            showInput: false,
            title: props.task.title,
            inputValue: props.task.title
        }
    }

    hadlerHover() {
        this.setState({
            showInput: false
        })
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

    render() {
        return (
            <div className="task-list__task task">
                <div className="task__body">
                    <div className="task__preview">
                        <div style={{ display: this.state.showInput ? 'none' : 'block' }} className="task__sub-title" onClick={this.onDbClickHandler.bind(this)}>{this.props.task.title}</div>
                        <div className={"task__input input" + " " + (this.state.showInput ? "show" : "hidden")}>
                            <input type="text"
                                onKeyPress={this.handleKeyPress.bind(this)}
                                value={this.state.inputValue}
                                onChange={this.handleChange.bind(this)}
                                onMouseLeave={this.hadlerHover.bind(this)} />
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