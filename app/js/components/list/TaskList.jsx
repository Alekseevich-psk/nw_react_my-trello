import React from 'react';
import TaskListInner from './TaskListInner.jsx';
import AddTaskBoard from './../elements/AddTaskBoard.jsx';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
    }

    getListTaskForCat(catId) {
        return this.props.taskList.filter((el) => el.catId == catId)
    }

    render() {
        return (
            <section className="task-list" >
                <div className="container">
                    <div className="task-list__wrapper">
                        {this.props.catList.map((el, index) =>
                            <TaskListInner
                                category={el}
                                taskList={this.getListTaskForCat(index + 1)}
                                key={index}
                                editCategory={this.props.editCategory}
                                addTask={this.props.addTask}
                                editTask={this.props.editTask}
                            />
                        )}
                    </div>
                    <AddTaskBoard addTaskBoard={this.props.addTaskBoard} />
                </div>
            </section>
        )
    }
}

export default TaskList;