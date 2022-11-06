import React from 'react';
import TaskItem from './../elements/TaskItem.jsx';
import AddTask from './../elements/AddTask.jsx';
import TaskListHeader from './../elements/TaskListHeader.jsx';

class TaskListInner extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.updateCoords = this.updateCoords.bind(this);
        this.addTaskForList = this.addTaskForList.bind(this);

        this.state = {
            style: null,
            onDnD: true,
            targetElem: null
        }
    }

    updateCoords(data) {

        if(!data.style) {
            this.setState({
                style: null
            })

            return;
        }

        const style = {
            position: 'fixed',
            width: '280px',
            transform: "rotate(2deg)",
            zIndex: '9999',
            top: data.top,
            left: data.left,
        }

        this.setState({
            style: style
        })
    }

    addTaskForList(obj) {
        obj.catId = this.props.category.id;
        this.props.addTask(obj);
    }


    componentDidMount() {
        const elem = this.myRef.current;
        const posElem = elem.getBoundingClientRect();

        this.props.dragAndDrop({
            coordList: {
                catId: this.props.category.id,
                top: posElem.top,
                bottom: posElem.bottom,
                left: posElem.left,
                right: posElem.right,
            }
        });
    }

    render() {
        return (
            <div className="task-list__inner"
                ref={this.myRef}
                style={this.state.style}>

                <TaskListHeader
                    dragAndDrop={this.props.dragAndDrop}
                    updateCoords={this.updateCoords}
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