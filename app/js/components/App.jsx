
import React from 'react';
import Header from './chunks/Header.jsx';
import Footer from './chunks/Footer.jsx';
import TaskList from './list/TaskList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.addTaskForList = this.addTaskForList.bind(this);
        this.addTaskBoard = this.addTaskBoard.bind(this);
        this.editCategoryTitle = this.editCategoryTitle.bind(this);

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

    editCategoryTitle(value, catId) {
        // this.state.catList.filter((el) => el.id === catId)[0].title = value;
        const res = this.state.catList.find((el, i) => el.id === catId)
        console.log(res.title = value);
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
                        editCategoryTitle={this.editCategoryTitle}
                        catList={this.state.catList}
                        addTask={this.addTaskForList}
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
                    id: 1,
                    title: 'Title 1',
                    text: 'text content',
                    catId: 2
                },
                {
                    id: 2,
                    title: 'Title 2',
                    text: 'text content',
                    catId: 2
                },
                {
                    id: 1,
                    title: 'Title 1',
                    text: 'text content',
                    catId: 3
                },
                {
                    id: 2,
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
