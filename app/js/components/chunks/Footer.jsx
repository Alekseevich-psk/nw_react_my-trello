import React from 'react';

class Footer extends React.Component {

    constructor(props) {
        super(props);
   
        this.state = {
            day: '',
            time: ''
        }

    }

    componentDidMount() {
        this.updateDate();
    }

    updateDate() {
        setInterval(() => {
            this.setState({
                time: new Date().toLocaleDateString(),
                day: new Date().toLocaleTimeString().slice(0, -3)
            })
        }, 1000);
    }

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="footer__inner">
                        Всего задач: <span>{this.props.taskList}</span>
                    </div>
                    <div className="footer__inner">
                        <div className="footer__date-time">{this.state.day}</div>
                        <div className="footer__date-day">{this.state.time}</div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;