import React from 'react';
import TaskListInner from './TaskListInner.jsx';
import AddTaskBoard from './AddTaskBoard.jsx';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
    }

    addTaskForList(value) {
        console.log(value);
    }

    render() {
        return (
            <section className="task-list" >
                <div className="container">
                    <div className="task-list__wrapper">
                        {this.props.list.taskList.map((el, i) =>
                        {console.log(i)}
                            <TaskListInner addTask={this.addTaskForList} el={el} key={i}/>
                        )}
                    </div>
                    <AddTaskBoard />
                </div>
            </section>
        )
    }
}

export default TaskList;