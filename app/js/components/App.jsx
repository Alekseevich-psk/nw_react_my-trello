
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
        this.updateCoordElem(this.state.updateCoordElem += 1);
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
                    catList: this.state.catList
                })
            }

        }

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

            let targetElemTaskList = null;
            let indexTargetElemTaskList = null;

            let targetElemCoordsTasks = null;
            let indexTargetElemCoordsTasks = null;

            this.state.taskList.find(function (el, index) {
                if (el.id === data.coord.taskId) {
                    indexTargetElemTaskList = index;
                    targetElemTaskList = el;
                }
            })

            this.state.coordsTasks.find(function (el, index) {
                if (el.id === data.coord.taskId) {
                    indexTargetElemCoordsTasks = index;
                    targetElemCoordsTasks = el;
                }
            })

            let lowElemCoordsTasks = null;
            let indexLowElemCoordsTasks = null;

            let lowElemTaskList = null;
            let indexLowElemTaskList = null;

            this.state.coordsTasks.find(function (el, index) {
                if (el.leftElem <= data.coord.x
                    && data.coord.x <= el.rightElem
                    && el.topElem <= data.coord.y
                    && data.coord.y <= el.bottomElem) {
                    lowElemCoordsTasks = el;
                    indexLowElemCoordsTasks = index;
                }
            })

            this.state.taskList.find(function (el, index) {
                if (lowElemCoordsTasks && el.id === lowElemCoordsTasks.id) {
                    indexLowElemTaskList = index;
                    lowElemTaskList = el;
                }
            })

            const newCat = this.state.coordsTaskList.find((el) =>
                data.coord.x >= el.left
                && data.coord.x <= el.right
                && data.coord.y >= el.top
                && data.coord.y <= el.bottom);

            const checkElem = targetElemTaskList !== lowElemTaskList && lowElemTaskList !== null;

            if (checkElem) {
                let corIndex = function () {
                    if ((indexTargetElemTaskList + 1) >= indexLowElemTaskList) return 0;
                    return 1;
                }();

                const catElemCatList = this.state.taskList.splice(indexTargetElemTaskList, 1);
                catElemCatList[0].catId = newCat.catId;
                this.state.taskList.splice(indexLowElemTaskList - corIndex, 0, catElemCatList[0]);

                const catElemCoordsTasks = this.state.coordsTasks.splice(indexTargetElemCoordsTasks, 1);
                this.state.coordsTasks.splice(indexLowElemCoordsTasks - corIndex, 0, catElemCoordsTasks[0]);

                this.setState({
                    taskList: this.state.taskList
                })

            }

            if (newCat && targetElemTaskList.catId !== newCat.catId) {
                const catElemTaskList = this.state.taskList.splice(indexTargetElemTaskList, 1);
                catElemTaskList[0].catId = newCat.catId;

                this.state.taskList.push(catElemTaskList[0]);

                const catElemCoordsTasks = this.state.coordsTasks.splice(indexTargetElemCoordsTasks, 1);
                catElemCoordsTasks[0].catId = newCat.catId;
                this.state.coordsTasks.push(catElemCoordsTasks[0]);

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
        this.updateCoordElem(this.state.updateCoordElem += 1);
        this.state.catList.find((el) => el.id === catId).title = value;
    }

    addTaskForList(task) {
        this.updateCoordElem(this.state.updateCoordElem += 1);
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
                    <Footer taskList={this.state.taskList.length} />
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
