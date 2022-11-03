import React from 'react';

class TaskListHeader extends React.Component {

    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);

        this.state = {
            timer: null,
            showInput: false,
            valueInput: this.props.category.title
        }
    }

    hadlerHover() {
        this.setState({
            showInput: false
        })
    }

    handleKeyPress(event) {
        if (event.charCode == 13) {
            this.setState({
                showInput: false
            })
            this.props.editCategoryTitle(event.target.value, this.props.category.id)
        }
    }

    onClickHandler(event) {
        clearTimeout(this.timer);

        if (event.detail === 1) {
            this.timer = setTimeout(this.props.onClick, 200)
        } else if (event.detail === 2) {
            this.setState({
                showInput: true
            })
        }

    }

    render() {
        return (
            <div className="task-list__header" onClick={this.onClickHandler}>
                <div style={{ display: this.state.showInput ? 'none' : 'block' }} className="task-list__title">{this.props.category.title}</div>
                <div className={"task-list__input input" + " " + (this.state.showInput ? "show" : "hidden")}>
                    <input type="text"
                        onKeyPress={this.handleKeyPress.bind(this)}
                        defaultValue={this.state.valueInput}
                        onMouseLeave={this.hadlerHover.bind(this)} />
                </div>
            </div>
        )
    }
}

export default TaskListHeader;