import React from 'react';
import TaskContent from './../elements/TaskContent.jsx';
import Input from './../elements/Input.jsx';

class Popup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showInput: false
        }

    }

    getInputValue(showInput, valueInput) {
        this.setState({
            showInput: showInput
        })

        this.props.updateTask({
            id: this.props.task.id,
            title: valueInput
        })
    }

    onHandlerClick() {
        this.props.closePopup();
    }

    onDbClickHandler(event) {
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
        if (this.props.task) {
            return (
                <div className={"popup" + " " + (this.props.show ? "is-active" : "")}>
                    <div className="popup__overlay">
                        <div className="popup__body">
                            <div className="popup__close" onClick={this.onHandlerClick.bind(this)}>
                                <img src={"./img/close-btn.svg"} alt="" />
                            </div>
                            <div className="popup__inner">
                                <div className="popup__header">
                                    <div
                                        style={{ display: this.state.showInput ? 'none' : 'block' }}
                                        className="popup__title"
                                        onClick={this.onDbClickHandler.bind(this)}>{this.props.task.title}
                                    </div>
                                    <div className={"popup__input input" + " " + (this.state.showInput ? "show" : "hidden")}>
                                        <Input
                                            show={this.getInputValue.bind(this)}
                                            defaultValue={this.props.task.title}
                                        />
                                    </div>
                                    <div className="popup__date">{this.props.task.date}</div>
                                </div>
                                <TaskContent
                                    task={this.props.task}
                                    updateTask={this.props.updateTask}
                                />
                                <div className="popup__footer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Popup;