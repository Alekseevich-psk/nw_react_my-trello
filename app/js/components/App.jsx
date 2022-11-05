
import React from 'react';
import Header from './chunks/Header.jsx';
import Footer from './chunks/Footer.jsx';
import Popup from './chunks/Popup.jsx';
import TaskList from './list/TaskList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.addTaskForList = this.addTaskForList.bind(this);
        this.addTaskBoard = this.addTaskBoard.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.editTask = this.editTask.bind(this);
        this.editTaskPopup = this.editTaskPopup.bind(this);
        this.dragAndDrop = this.dragAndDrop.bind(this);

        this.state = {
            taskList: [],
            catList: [],
            isLoaded: false,
            showPopup: false,
            editTask: null,
            coordsTaskList: [],
            coordMouse: {
                x: null,
                y: null
            }
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

    closePopup() {
        this.setState({
            showPopup: false,
            editTask: null
        })
    }

    dragAndDrop(data) {
        console.log(data);
        if (data.coordList) this.state.coordsTaskList.push(data.coordList);

        if (data.coord) {

            const newCatId = this.state.coordsTaskList.find((el) => el.first <= data.coord.x && data.coord.x <= el.last);
            if (newCatId) {
                this.state.taskList.find((el) => el.id === data.coord.taskId).catId = newCatId.catId;
                this.setState({
                    taskList: this.state.taskList
                })
            }

        }


    }

    editTask(value, taskId) {
        if (value === null) {
            this.setState({
                showPopup: true,
                editTask: this.state.taskList.find((el) => el.id === taskId)
            })
            return;
        }

        this.state.taskList.find((el) => el.id === taskId).title = value;

    }

    editTaskPopup(task) {
        const objTask = this.state.taskList.find((el) => el.id === task.id);
        if (task.title) objTask.title = task.title;
        if (task.text) objTask.text = task.text;
    }

    editCategory(value, catId) {
        this.state.catList.find((el) => el.id === catId).title = value;
    }

    addTaskForList(task) {
        this.setState({
            taskList: [...this.state.taskList, {
                id: this.state.taskList.length + 1,
                title: task.title,
                catId: task.catId,
                date: task.date
            }]
        })
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <>
                    <Header />
                    <TaskList
                        dragAndDrop={this.dragAndDrop}
                        taskList={this.state.taskList}
                        catList={this.state.catList}
                        editCategory={this.editCategory}
                        addTask={this.addTaskForList}
                        editTask={this.editTask}
                        addTaskBoard={this.addTaskBoard} />
                    <Footer />
                    <Popup
                        show={this.state.showPopup}
                        closePopup={this.closePopup}
                        updateTask={this.editTaskPopup}
                        task={this.state.editTask} />
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
                    catId: 1,
                    date: null
                },
                {
                    id: 2,
                    title: 'Title 2',
                    text: 'text content',
                    catId: 1,
                    date: null
                },
                {
                    id: 3,
                    title: 'Title 1',
                    text: 'text content',
                    catId: 2,
                    date: null
                },
                {
                    id: 4,
                    title: 'Title 2',
                    text: 'text content',
                    catId: 2,
                    date: null
                },
                {
                    id: 5,
                    title: 'Title 1',
                    text: 'text content',
                    catId: 3,
                    date: null
                },
                {
                    id: 6,
                    title: 'Title 2',
                    text: 'text content',
                    catId: 1,
                    date: null
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
