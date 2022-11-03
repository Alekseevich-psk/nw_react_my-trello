import React from 'react';

class TaskItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.task.title,
            content: props.task.text
        }
    }

    render() {
        return (
            <div className="task-list__task task">
                <div className="task__body">
                    <div className="task__preview">
                        <div className="task__sub-title">{this.state.title}</div>
                        <div className="task__input input">
                            <input type="text" />
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