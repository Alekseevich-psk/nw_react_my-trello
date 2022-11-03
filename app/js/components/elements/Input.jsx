import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
    }

    handleKeyPress(event) {
        if (event.charCode == 13) {
            this.props.show(false, event.target.value)
        }
    }


    render() {
        return (
            <>
                <input type="text"
                    onKeyPress={this.handleKeyPress.bind(this)}
                    defaultValue={this.props.defaultValue} />
            </>
        )
    }
}

export default Input;