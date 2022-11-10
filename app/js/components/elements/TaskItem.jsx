import React from 'react';

class TaskItem extends React.Component {

    constructor(props) {
        super(props);

        this.myRef = React.createRef();
        this.updateCoords = this.updateCoords.bind(this);

        this.state = {
            content: props.task.text,
            timer: null,
            showInput: false,
            title: props.task.title,
            inputValue: props.task.title,
            style: null,
            mouseMove: false,
            targetElem: null,
            updateCoordElem: this.props.updateCoordElem,
            onDnD: true,
            coords: {
                x: null,
                y: null
            }
        }
    }

    handleKeyPress(event) {
        if (event.charCode == 13) {
            this.setState({
                showInput: false,
            })
            this.props.editTask(event.target.value, this.props.task.id);
        }
    }

    onDbClickHandler(event) {
        clearTimeout(this.timer);

        if (event.detail === 1) {
            this.timer = setTimeout(this.props.onClick, 200)
        } else if (event.detail === 2) {
            this.onMouseMove(false);
            if (this.state.inputValue !== this.props.task.title) {
                this.setState({
                    onDnD: true,
                    inputValue: this.props.task.title
                })
            }
            this.setState({
                showInput: true
            })
        }
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    onClickHandler() {
        this.props.editTask(null, this.props.task.id)
    }

    updateCoords(event) {

        if (event.target.classList.value !== this.state.targetElem) {
            this.setState({
                style: null,
                targetElem: null
            })

            return;
        }

        const style = {
            position: 'fixed',
            width: '240px',
            transform: "rotate(3deg)",
            zIndex: '9999',
            top: event.clientY - (event.target.getBoundingClientRect().height / 2),
            left: event.clientX - (event.target.getBoundingClientRect().width / 2),
        }

        this.setState({
            style: style
        })
    }

    onMouseMove(value) {

        if (value) {
            window.addEventListener('mousemove', this.updateCoords)
        } else {
            window.removeEventListener('mousemove', this.updateCoords)
            window.onmouseup = null;
        }
    }

    handlerOnMouseDown(event) {
        if(this.state.onDnD && !this.state.showInput) {
            this.onMouseMove(true);

            this.setState({
                targetElem: event.target.classList.value
            })
        }
    }

    handlerOnMouseUp(event) {

        this.props.dragAndDrop({
            coord: {
                taskId: this.props.task.id,
                catId: this.props.task.catId,
                y: event.clientY,
                x: event.clientX,
            }
        });

        this.getCoordElem(true);

        this.setState({
            style: null,
            targetElem: null
        })

        this.onMouseMove(false);
    }

    getCoordElem(value) {
        const elem = this.myRef.current;
        const posElem = elem.getBoundingClientRect();

        this.props.dragAndDrop({
            coordListItem: {
                id: this.props.task.id,
                catId: this.props.task.catId,
                topElem: posElem.top,
                bottomElem: posElem.bottom,
                leftElem: posElem.left,
                rightElem: posElem.right,
                updateCoord: value
            }
        });
    }

    componentDidUpdate() {
        if (this.props.updateCoordElem !== this.state.updateCoordElem) {
            this.setState({
                updateCoordElem: this.props.updateCoordElem
            })

            this.getCoordElem(false);
        }
    }


    componentDidMount() {
        this.getCoordElem(false);
    }

    render() {
        return (
            <div
                ref={this.myRef}
                style={this.state.style}
                className="task-list__task task"
                onMouseDown={this.handlerOnMouseDown.bind(this)}
                onMouseUp={this.handlerOnMouseUp.bind(this)}
            >
                <div className="task__body">
                    <div className="task__preview">
                        <div style={{ display: this.state.showInput ? 'none' : 'block' }} className="task__sub-title" onClick={this.onDbClickHandler.bind(this)}>{this.props.task.title}</div>
                        <div className={"task__input input" + " " + (this.state.showInput ? "show" : "hidden")}>
                            <input type="text"
                                onKeyPress={this.handleKeyPress.bind(this)}
                                value={this.state.inputValue}
                                onChange={this.handleChange.bind(this)} />
                        </div>
                        <button className="task__btn-edit-task" onClick={this.onClickHandler.bind(this)}></button>
                    </div>
                    <div className="task__inner">
                        <div className="task__date">{this.props.task.date}</div>
                        <div className="task__text-area">
                            {this.state.title}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskItem;