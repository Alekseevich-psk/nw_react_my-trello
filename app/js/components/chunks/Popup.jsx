import React from 'react';

class Popup extends React.Component {

    constructor(props) {
        super(props);

        this.onDbClickHandler = this.onDbClickHandler.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            title: '',
            showInput: false,
            showTextArea: false,
        }

    }

    onHandlerClick() {
        this.props.closePopup()
    }

    handleKeyPress(event) {

        if (event.charCode == 13) {
            this.setState({
                showInput: false
            })
            
            this.updateTask(event);
        }
    }

    hadlerHover(event) {
        this.setState({
            showInput: false
        })

        this.updateTask(event);
    }

    updateTask(event) {
        this.props.updateTask({
            id: this.props.task.id,
            title: event.target.value,
        })
    }

    onDbClickHandler(event) {
        clearTimeout(this.timer);

        if (event.detail === 1) {
            this.timer = setTimeout(this.props.onClick, 200)
        } else if (event.detail === 2) {

            if (event.target.classList.contains('popup__title')) {
                this.setState({
                    showInput: true
                })
            } else {
                this.setState({
                    showTextArea: true
                })
            }
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
                                        onClick={this.onDbClickHandler}>{this.props.task.title}
                                    </div>


                                    <div className={"popup__input input" + " " + (this.state.showInput ? "show" : "hidden")}>
                                        <input type="text"
                                            onMouseLeave={this.hadlerHover.bind(this)}
                                            onKeyPress={this.handleKeyPress}
                                            defaultValue={this.props.task.title} />
                                    </div>



                                    <div className="popup__date">10.10.2022</div>
                                </div>
                                <div className="popup__wrapper">
                                    <div
                                        style={{ display: this.state.showTextArea ? 'none' : 'block' }}
                                        className="popup__text"
                                        onClick={this.onDbClickHandler}>
                                        {this.props.task.text}
                                    </div>
                                    {/* <div className={"popup__text-area-wrap " + (this.state.showTextArea ? "show" : "hidden")}>
                                        <textarea className="popup__text-area"  ></textarea>
                                        <button className='popup__btn' >Сохранить</button>
                                    </div> */}
                                </div>
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