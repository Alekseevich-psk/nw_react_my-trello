import React from 'react';
import TaskItem from './TaskItem.jsx';

class TaskListInner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: Object.keys(props.el),
        }
    }

    render() {
        return (
            <div className="task-list__inner">
                <div className="task-list__header">
                    <div className="task-list__title">{this.state.title}</div>
                    <div className="task-list__input input">
                        <input type="text" name="work" />
                    </div>
                </div>

                <div className="task-list__track">
                    {Object.values(this.props.el)[0].map((el, i) =>
                        <TaskItem el={el} key={i} />
                    )}
                </div>

                <div className="task-list__add-task">
                    <div className="task-list__add-task-ico"></div>
                    <button className="task-list__add-task-btn">Добавить задачу</button>
                </div>
            </div>
        )
    }
}

export default TaskListInner;