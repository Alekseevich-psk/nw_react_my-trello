import React from 'react';

class Popup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            task: ''
        }

    }

    onHandlerClick() {
        this.props.closePopup()
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
                                    <div className="popup__title">{this.props.task.title}</div>
                                    <div className="popup__date">10.10.2022</div>
                                </div>
                                <div className="popup__wrapper">
                                    <div className="popup__text">{this.props.task.text}</div>
                                    <div className="popup__text-area"></div>
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