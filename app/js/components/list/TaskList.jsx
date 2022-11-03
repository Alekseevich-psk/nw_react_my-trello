import React from 'react';
import TaskListInner from './TaskListInner.jsx';
import AddTaskBoard from './../elements/AddTaskBoard.jsx';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.getListTaskForCat = this.getListTaskForCat.bind(this);
        this.getListTaskForCat();
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
                            <TaskListInner category={el} taskList={this.getListTaskForCat(index)} key={index} />
                        )}
                    </div>
                    <AddTaskBoard />
                </div>
            </section>
        )
    }
}

export default TaskList;