import React from 'react';

class AddTaskBoard extends React.Component {

    constructor(props) {
        super(props);
    }

    handlerClick(event) {
        this.props.addTaskBoard(event)
    }

    render() {
        return (
            <div className="task-list__btn-add-wrap-task" onClick={this.handlerClick.bind(this)}>
                <img src={"./img/btn-add.svg"} alt="" />
            </div>
        )
    }
}

export default AddTaskBoard;