
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
            coordsTasks: [],
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

        if (data.coordList) this.state.coordsTaskList.push(data.coordList);

        if (data.coordListItem) {

            const elem = this.state.coordsTasks.find((el) => el.id === data.coordListItem.id);
            if (!elem) {
                this.state.coordsTasks.push(data.coordListItem);
            }

        };

        if (data.newCoordForList) {
            const targetCat = this.state.coordsTaskList.find((el) => el.left <= data.newCoordForList.x && el.right >= data.newCoordForList.x);
            const indexCatInCatList = this.state.coordsTaskList.indexOf(targetCat);

            const targetCatInCatList = this.state.catList.find((el) => el.id === data.newCoordForList.id);
            const indexTargetCatInCatList = this.state.catList.indexOf(targetCatInCatList);

            if (indexCatInCatList === 0) {
                const cutElement = this.state.catList.splice(indexTargetCatInCatList, 1);
                this.state.catList.unshift(cutElement[0]);
                this.setState({
                    catList: this.state.catList
                })

                return;
            }

            if (targetCat) {
                const cutElement = this.state.catList.splice(indexCatInCatList, 1)
                this.state.catList.splice(indexTargetCatInCatList, 0, cutElement[0])
                this.setState({
                    catList: this.state.catList
                })

                return;
            }

        }

        if (data.coord) {

            // опр категорию при mouseUp
            const newCatIdForTask = this.state.coordsTaskList.find((el) =>
                el.left <= data.coord.x && data.coord.x <= el.right
                && el.top <= data.coord.y && data.coord.y <= el.bottom);

            // elemInCoordList - если таск отпустить над другим таском, то сюда приходит таск над которым отпустил
            const elemInCoordList = this.state.coordsTasks.find((el) =>
                el.topElem <= data.coord.y && data.coord.y <= el.bottomElem
                && el.leftElem <= data.coord.x && el.rightElem >= data.coord.x);

            // Получаю таск (таскИндекс) в taskList при mouseUp
            const elemInTaskList = this.state.taskList.find((el) => el.id === data.coord.taskId);
            const idElemInTaskList = this.state.taskList.indexOf(elemInTaskList);

            // сравниванию id категории при mouseUp
            const checkCatId = function () {
                if (newCatIdForTask && data.coord.catId !== newCatIdForTask.catId) return true;
                return false;
            }();

            // сравниваю id элемента которы схватил, и тот над которым отпустил
            const checkElemId = function () {
                if (elemInCoordList && data.coord && elemInCoordList.id !== data.coord.taskId) return true;
                return false;
            }();

            if (checkElemId) {
                const newIdForTask = this.state.taskList.find((el) => el.id === elemInCoordList.id);
                const newIndexForTask = this.state.taskList.indexOf(newIdForTask);

                if (checkCatId) {
                    this.state.taskList.find((el) => el.id === data.coord.taskId).catId = newCatIdForTask.catId;
                }

                // меняю местами элемент в taskList
                this.state.taskList[idElemInTaskList] = [this.state.taskList[newIndexForTask],
                this.state.taskList[newIndexForTask] = this.state.taskList[idElemInTaskList]][0];

                this.setState({
                    taskList: this.state.taskList
                })

                return;
            }

            if (!checkElemId && checkCatId) {
                this.state.taskList.find((el) => el.id === data.coord.taskId).catId = newCatIdForTask.catId;
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
                    title: 'Title 3',
                    text: 'text content',
                    catId: 2,
                    date: null
                },
                {
                    id: 4,
                    title: 'Title 4',
                    text: 'text content',
                    catId: 2,
                    date: null
                },
                {
                    id: 5,
                    title: 'Title 5',
                    text: 'text content',
                    catId: 3,
                    date: null
                },
                {
                    id: 6,
                    title: 'Title 6',
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
