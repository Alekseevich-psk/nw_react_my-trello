import React from 'react';

class TaskItem extends React.Component {

    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);

        this.state = {
            content: props.task.text,
            timer: null,
            showInput: false,
            valueInput: props.task.title
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
                showInput: false
            })
            this.props.editTask(event.target.value, this.props.task.id)
        }
    }

    onClickHandler(event) {
        clearTimeout(this.timer);

        if (event.detail === 1) {
            this.timer = setTimeout(this.props.onClick, 200)
        } else if (event.detail === 2) {
            this.setState({
                showInput: true
            })
        }
    }

    render() {
        return (
            <div className="task-list__task task">
                <div className="task__body">
                    <div className="task__preview">
                        <div style={{ display: this.state.showInput ? 'none' : 'block' }} className="task__sub-title" onClick={this.onClickHandler}>{this.props.task.title}</div>
                        <div className={"task__input input" + " " + (this.state.showInput ? "show" : "hidden")}>
                        <input type="text"
                        onKeyPress={this.handleKeyPress.bind(this)}
                        defaultValue={this.state.valueInput}
                        onMouseLeave={this.hadlerHover.bind(this)} />
                        </div>
                        <button className="task__btn-edit-task">edit</button>
                    </div>
                    <div className="task__inner">
                        <div className="task__date">10.10.2022</div>
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