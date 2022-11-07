import React from 'react';

class TaskListHeader extends React.Component {

    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
        this.updateCoords = this.updateCoords.bind(this);

        this.state = {
            timer: null,
            style: null,
            onDnD: true,
            targetElem: null,
            showInput: false,
            clickBtnRemove: false,
            valueInput: props.category.title
        }
    }

    updateCoords(event) {

        if(event.target !== this.state.targetElem) {
            this.setState({
                style: false,
                targetElem: null,
            })
        }

        if (this.state.onDnD) {
            this.props.updateCoords({
                style: this.state.style,
                top: event.clientY - (event.target.getBoundingClientRect().height / 2),
                left: event.clientX - (event.target.getBoundingClientRect().width / 2),
            })
        }
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

        if(this.state.clickBtnRemove) {
            this.setState({
                clickBtnRemove: false
            })

            return;
        }

        if (this.state.onDnD) {
            this.onMouseMove(true);
            this.setState({
                style: true,
                targetElem: event.target
            })
        }

        this.props.updateCoords({
            mouseUp: false,
        })
    }

    handlerOnMouseUp(event) {

        this.setState({
            style: false,
        })

        this.props.dragAndDrop({
            newCoordForList: {
                id: this.props.category.id,
                y: event.clientY,
                x: event.clientX
            }
        });

        this.props.updateCoords({
            style: false,
            mouseUp: true,
            top: event.clientY - (event.target.getBoundingClientRect().height / 2),
            left: event.clientX - (event.target.getBoundingClientRect().width / 2),
        })

        this.onMouseMove(false);
    }

    removeCat() {

        this.setState({
            clickBtnRemove: true
        })


        this.props.editCategory({
            title: null,
            catId: this.props.category.id,
            remove: true
        })
    }

    handleKeyPress(event) {
        if (event.charCode == 13) {
            this.setState({
                showInput: false
            })
 
            this.props.editCategory({
                title: event.target.value,
                catId: this.props.category.id,
                remove: false
            })
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
            <div
                onMouseDown={this.handlerOnMouseDown.bind(this)}
                onMouseUp={this.handlerOnMouseUp.bind(this)}
                className="task-list__header"
                onClick={this.onClickHandler}>
                <div style={{ display: this.state.showInput ? 'none' : 'block' }} className="task-list__title">{this.props.category.title}</div>
                <div className="task-list__btn-del" onClick={this.removeCat.bind(this)}></div>
                <div className={"task-list__input input" + " " + (this.state.showInput ? "show" : "hidden")}>
                    <input type="text"
                        onKeyPress={this.handleKeyPress.bind(this)}
                        defaultValue={this.state.valueInput} />
                </div>
            </div>
        )
    }
}

export default TaskListHeader;