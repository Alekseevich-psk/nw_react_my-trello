import React from 'react';

class AddTask extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showInput: false
        }
    }

    handleClick(e) {
        this.setState({
            showInput: true
        })
    }

    focusChange() {
        this.setState({
            showInput: false
        })
    }

    handleKeyPress(event) {
        if (event.charCode == 13) {
            this.setState({
                showInput: false
            })

            this.props.addTask({
                title: event.target.value,
                date: new Date().toLocaleDateString()
            });
            event.target.value = '';
        }
    }

    render() {
        return (
            <div className="task-list__add-task-wrap">
                <div className={"task-list__input input" + " " + (this.state.showInput ? 'show' : 'hidden')}>
                    <input
                        onBlur={this.focusChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                        type="text" />
                </div>
                <div className={"task-list__add-task"}>
                    <div className="task-list__add-task-ico"></div>
                    <button onClick={this.handleClick.bind(this)} className="task-list__add-task-btn">Добавить задачу</button>
                </div>
            </div>
        )
    }
}

export default AddTask;