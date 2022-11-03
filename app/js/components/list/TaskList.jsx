import React from 'react';
import TaskListInner from './TaskListInner.jsx';
import AddTaskBoard from './../elements/AddTaskBoard.jsx';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.getListTaskForCat = this.getListTaskForCat.bind(this);
        this.addTaskForList = this.addTaskForList.bind(this);
        this.addTaskBoard = this.addTaskBoard.bind(this);
    }

    getListTaskForCat(catId) {
        return this.props.taskList.filter((el) => el.catId == catId)
    }

    addTaskForList(value, catId) {
        this.props.addTask(value, catId);
    }

    addTaskBoard() {
        this.props.addTaskBoard();
    }

    render() {
        return (
            <section className="task-list" >
                <div className="container">
                    <div className="task-list__wrapper">
                        {this.props.catList.map((el, index) =>
                            <TaskListInner category={el} taskList={this.getListTaskForCat(index + 1)} key={index} addTask={this.addTaskForList} />
                        )}
                    </div>
                    <AddTaskBoard addTaskBoard={this.addTaskBoard}/>
                </div>
            </section>
        )
    }
}

export default TaskList;