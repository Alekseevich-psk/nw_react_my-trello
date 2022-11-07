
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
        this.updateCoordElem = this.updateCoordElem.bind(this);

        this.state = {
            taskList: [],
            catList: [],
            isLoaded: false,
            showPopup: false,
            editTask: null,
            coordsTaskList: [],
            coordsTasks: [],
            updateCoordElem: 1,
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

    updateCoordElem(value) {
        this.setState({
            updateCoordElem: value
        });
    }

    dragAndDrop(data) {

        // cat coord
        if (data.coordList) {

            if (data.coordList.updateCoord) {
                this.updateCoordElem(this.state.updateCoordElem += 1);
            }

            const elem = this.state.coordsTaskList.find((el) => el.catId === data.coordList.catId);
            if (!elem) {
                this.state.coordsTaskList.push(data.coordList);
            } else {
                this.state.coordsTaskList.find((el, index) => {
                    if (el.catId === data.coordList.catId) {
                        this.state.coordsTaskList[index] = data.coordList;
                        this.setState({
                            coordsTaskList: this.state.coordsTaskList
                        })
                    }
                })
            }
        }

        if (data.newCoordForList) {

            const targetCatCoordsTaskList = this.state.coordsTaskList.find((el) => el.left <= data.newCoordForList.x && el.right >= data.newCoordForList.x);
            const indexCatInCoordsTaskList = this.state.coordsTaskList.indexOf(targetCatCoordsTaskList);

            const targetCatInCatList = this.state.catList.find((el) => el.id === data.newCoordForList.id);
            const indexTargetCatInCatList = this.state.catList.indexOf(targetCatInCatList);

            if (indexCatInCoordsTaskList !== indexTargetCatInCatList) {

                const cutElementCatList = this.state.catList.splice(indexTargetCatInCatList, 1);
                this.state.catList.splice(indexCatInCoordsTaskList, 0, cutElementCatList[0]);

                const cutElementCoordsList = this.state.coordsTaskList.splice(indexTargetCatInCatList, 1);
                this.state.coordsTaskList.splice(indexCatInCoordsTaskList, 0, cutElementCoordsList[0]);

                this.setState({
                    coordsTaskList: this.state.coordsTaskList,
                    catList: this.state.catList
                })
            }

        }

        // task coord
        if (data.coordListItem) {

            if (data.coordListItem.updateCoord) {
                this.updateCoordElem(this.state.updateCoordElem += 1);
            }

            const elem = this.state.coordsTasks.find((el) => el.id === data.coordListItem.id);
            if (!elem) {
                this.state.coordsTasks.push(data.coordListItem);
            } else {
                this.state.coordsTasks.find((el, index) => {
                    if (el.id === data.coordListItem.id) {
                        this.state.coordsTasks[index] = data.coordListItem;
                        this.setState({
                            coordsTasks: this.state.coordsTasks
                        })
                    }
                })
            }
        };

        if (data.coord) {

            // опр категорию при mouseUp
            const newCatIdForTask = this.state.coordsTaskList.find((el) =>
                el.left <= data.coord.x && data.coord.x <= el.right
                && el.top <= data.coord.y && data.coord.y <= el.bottom);

            // сравниванию id категории при mouseUp
            const checkCatId = function () {
                if (newCatIdForTask && data.coord.catId === newCatIdForTask.catId) return true;
                return false;
            }();

            // targetElemInCoordList - если таск отпустить над другим таском, то сюда приходит таск над которым отпустил
            const targetElemInCoordList = this.state.coordsTasks.find((el) =>
                el.topElem <= data.coord.y && data.coord.y <= el.bottomElem
                && el.leftElem <= data.coord.x && el.rightElem >= data.coord.x);


            // сравниваю id элемента который схватил, и тот над которым отпустил
            const checkElemId = function () {
                if (targetElemInCoordList && data.coord && targetElemInCoordList.id === data.coord.taskId) return true;
                return false;
            }();

            if (!checkElemId) {
                // Получаю таск (таскИндекс) в taskList при mouseUp
                const elemInTaskList = this.state.taskList.find((el) => el.id === data.coord.taskId);
                const idElemInTaskList = this.state.taskList.indexOf(elemInTaskList);

                const newIdForTask = this.state.taskList.find((el) => el.id === targetElemInCoordList.id);
                const newIndexForTask = this.state.taskList.indexOf(newIdForTask);

                console.log(idElemInTaskList, newIndexForTask, newCatIdForTask.catId);

                if (checkCatId) {
                    this.state.taskList.find((el) => el.id === data.coord.taskId).catId = newCatIdForTask.catId;
                }

                if (idElemInTaskList !== newIndexForTask) {

                    const cutElement = this.state.taskList.splice(idElemInTaskList, 1);
                    const cutTargetElem = this.state.taskList.splice(newIndexForTask, 1);

                    this.state.taskList.splice((newIndexForTask), 0, cutElement[0]);
                    this.state.taskList.splice((newIndexForTask + 1), 0, cutTargetElem[0]);

                    this.setState({
                        taskList: this.state.taskList
                    })

                    return;
                }
            }


            if (!checkElemId && !checkCatId) {
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
                        updateCoordElem={this.state.updateCoordElem}
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
