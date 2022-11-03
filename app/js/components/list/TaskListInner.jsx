import React from 'react';
import TaskItem from './../elements/TaskItem.jsx';
import AddTask from './../elements/AddTask.jsx';

class TaskListInner extends React.Component {

    constructor(props) {
        super(props);

        this.addTaskForList = this.addTaskForList.bind(this);
    }

    addTaskForList(value) {
        this.props.addTask(value, this.props.category.id);
    }

    render() {
        return (
            <div className="task-list__inner">
                <div className="task-list__header">
                    <div className="task-list__title">{this.props.category.title}</div>
                    <div className="task-list__input input">
                        <input type="text" name="work" />
                    </div>
                </div>

                <div className="task-list__track">
                    {this.props.taskList.map((el, index) =>
                        <TaskItem key={index} task={el} />
                    )}
                </div>

                <AddTask addTask={this.addTaskForList} />
            </div>
        )
    }
}

export default TaskListInner;