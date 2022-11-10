import React from 'react';

class AddTask extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            catList: this.props.catList,
            selectedValueCatId: this.props.task.catId
        }
    }

    changeSelectValue(event) {
        console.log(event.target.value);
        this.setState({
            selectedValueCatId: event.target.value
        })

        this.props.updateTask({
            id: this.props.task.id,
            newCatValue: Number(event.target.value)
        })
    }

    removeTask() {
        this.props.updateTask({
            id: this.props.task.id,
            removeTask: true
        })
    }

    render() {
        return (
            <div className="popup__footer">
                <div className="popup__category">
                    <select 
                    onChange={this.changeSelectValue.bind(this)} 
                    value={this.state.selectedValueCatId} 
                    className="select__select">
                        {this.state.catList.map((el) => {
                            return <option value={el.id} key={el.id}>{el.title}</option>;
                        })}
                    </select>
                </div>
                <div className="popup__remove">
                    <button 
                    onClick={this.removeTask.bind(this)}
                    className="popup__btn popup__btn--remove-tsk">Удалить</button>
                </div>
            </div>
        )
    }
}

export default AddTask;