import React from 'react';
import TaskItem from './../elements/TaskItem.jsx';
import AddTask from './../elements/AddTask.jsx';
import TaskListHeader from './../elements/TaskListHeader.jsx';

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

                <TaskListHeader
                    editCategory={this.props.editCategory}
                    category={this.props.category} />

                <div className="task-list__track">
                    {this.props.taskList.map((el, index) =>
                        <TaskItem
                            key={index}
                            task={el}
                            editTask={this.props.editTask} />
                    )}
                </div>

                <AddTask addTask={this.addTaskForList} />
            </div>
        )
    }
}

export default TaskListInner;