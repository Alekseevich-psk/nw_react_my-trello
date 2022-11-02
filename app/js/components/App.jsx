
import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import TaskList from './TaskList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.editTaskList = this.editTaskList.bind(this);

        this.state = {
            taskList: [],
            isLoaded: false,
            propsTest: ''
        }
    }

    componentDidMount() {
        this.setState({
            taskList: [
                {
                    'В работу': [
                        {
                            id: 1,
                            title: 'Title 1',
                            text: 'text content'
                        },
                        {
                            id: 2,
                            title: 'Title 2',
                            text: 'text content'
                        },
                    ],
                },
                {
                    'В работе': [
                        {
                            id: 3,
                            title: 'Title 3',
                            text: 'text content'
                        },
                        {
                            id: 4,
                            title: 'Title 4',
                            text: 'text content'
                        },
                    ],
                }

            ],
            isLoaded: true
        })
    }

    editTaskList(data) {
        console.log(data);
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <>
                    <Header />
                    <TaskList list={{ editTaskListFoo: this.editTaskList, taskList: this.state.taskList }} />
                    <Footer />
                </>
            )
        }
    }
}

export default App;
