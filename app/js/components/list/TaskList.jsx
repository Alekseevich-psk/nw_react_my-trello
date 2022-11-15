import React from 'react';
import TaskListInner from './TaskListInner.jsx';
import AddTaskBoard from './../elements/AddTaskBoard.jsx';

class TaskList extends React.Component {

    constructor(props) {
        super(props);
    }

    getListTaskForCat(item) {
        return this.props.taskList.filter(function (el) { if (el) return el.catId == item.id });
    }

    render() {
    
        return (
            <section className="task-list" >
                <div className="container">
                    <div className="task-list__wrapper">
                        {this.props.catList.map((el) =>
                            <TaskListInner
                                coordMouse={this.props.coordMouse}
                                updateCoordElem={this.props.updateCoordElem}
                                dragAndDrop={this.props.dragAndDrop}
                                category={el}
                                taskList={this.getListTaskForCat(el)}
                                key={el.id}
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