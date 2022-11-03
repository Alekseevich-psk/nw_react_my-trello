
import React from 'react';
import Header from './chunks/Header.jsx';
import Footer from './chunks/Footer.jsx';
import TaskList from './list/TaskList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.addTaskForList = this.addTaskForList.bind(this);
        this.addTaskBoard = this.addTaskBoard.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.editTask = this.editTask.bind(this);

        this.state = {
            taskList: [],
            catList: [],
            isLoaded: false,
        }

    }

    addTaskBoard() {
        this.setState({
            catList: [...this.state.catList, {
                id: this.state.catList.length + 1,
                title: 'New board'
            }]
        })
    }

    editTask(value, taskId) {
        this.state.taskList.find((el) => el.id === taskId).title = value;
    }

    editCategory(value, catId) {
        this.state.catList.find((el) => el.id === catId).title = value;
    }

    addTaskForList(value, catId) {
        this.setState({
            taskList: [...this.state.taskList, {
                id: this.state.taskList.length,
                title: value,
                catId: catId
            }]
        })
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <>
                    <Header />
                    <TaskList
                        taskList={this.state.taskList}
                        catList={this.state.catList}
                        editCategory={this.editCategory}
                        addTask={this.addTaskForList}
                        editTask={this.editTask}
                        addTaskBoard={this.addTaskBoard} />
                    <Footer />
                </>
            )
        }
    }

    componentDidMount() {
        this.setState({
            taskList: [
                {
                    id: 1,
                    title: 'Title 1',
                    text: 'text content',
                    catId: 1
                },
                {
                    id: 2,
                    title: 'Title 2',
                    text: 'text content',
                    catId: 1
                },
                {
                    id: 3,
                    title: 'Title 1',
                    text: 'text content',
                    catId: 2
                },
                {
                    id: 4,
                    title: 'Title 2',
                    text: 'text content',
                    catId: 2
                },
                {
                    id: 5,
                    title: 'Title 1',
                    text: 'text content',
                    catId: 3
                },
                {
                    id: 6,
                    title: 'Title 2',
                    text: 'text content',
                    catId: 1
                },

            ],
            catList: [
                {
                    id: 1,
                    title: 'В работе'
                },
                {
                    id: 2,
                    title: 'В работу'
                },
                {
                    id: 3,
                    title: 'Завершённые'
                }
            ],
            isLoaded: true
        })
    }
}

export default App;
