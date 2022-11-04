import React from 'react';
import TaskItem from './../elements/TaskItem.jsx';
import AddTask from './../elements/AddTask.jsx';
import TaskListHeader from './../elements/TaskListHeader.jsx';

class TaskListInner extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.addTaskForList = this.addTaskForList.bind(this);
    }

    addTaskForList(obj) {
        obj.catId = this.props.category.id;
        this.props.addTask(obj);
    }

    componentDidMount() {
        this.props.dragAndDrop({
            coordList: {
                catId: this.props.category.id,
                first: this.myRef.current.offsetLeft - 10,
                last: this.myRef.current.offsetLeft + this.myRef.current.clientWidth + 20,
            }
        });
    }

    render() {
        return (
            <div className="task-list__inner" ref={this.myRef}>

                <TaskListHeader
                    editCategory={this.props.editCategory}
                    category={this.props.category} />

                <div className="task-list__track">
                    {this.props.taskList.map((el) =>
                        <TaskItem
                            coordMouse={this.props.coordMouse}
                            dragAndDrop={this.props.dragAndDrop}
                            key={el.id}
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