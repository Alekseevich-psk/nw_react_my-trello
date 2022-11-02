import React from 'react';
import TaskListInner from './TaskListInner.jsx';
import AddTaskBoard from './AddTaskBoard.jsx';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <section className="task-list" >
                <div className="container">
                    <div className="task-list__wrapper">
                        {this.props.list.taskList.map((el, i) =>
                            <TaskListInner el={el} key={i}/>
                        )}
                    </div>
                    <AddTaskBoard />
                </div>
            </section>
        )
    }
}

export default TaskList;