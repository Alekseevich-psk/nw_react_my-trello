import React from 'react';
import TaskItem from './TaskItem.jsx';
import AddTask from './AddTask.jsx';

class TaskListInner extends React.Component {

    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            title: Object.keys(props.el),
        }
    }

    addTaskForList(value) {
        this.props.addTask(value);
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

                <AddTask addTask={this.addTaskForList} />
            </div>
        )
    }
}

export default TaskListInner;