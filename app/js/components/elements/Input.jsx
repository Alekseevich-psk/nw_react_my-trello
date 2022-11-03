import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: null,
            showInput: false,
            valueInput: ''
        }
    }

    hadlerHover() {
        this.setState({
            showInput: false
        })
    }

    setValueInput() {
        console.log(this.state.valueInput);
        this.props.valueInput(this.state.valueInput)
    }

    handleKeyPress(event) {
        if (event.charCode == 13) {
            this.setState({
                showInput: false, 
                valueInput: event.target.value
            })
        }
    }

    render() {
        return (
            <div className="task__input input show">
                <input type="text"
                    onKeyPress={this.handleKeyPress.bind(this)}
                    defaultValue={this.state.valueInput}
                    onMouseLeave={this.hadlerHover.bind(this)} />
            </div>
        )
    }
}

export default Input;