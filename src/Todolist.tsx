import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodoListPropsType = {
    removeTodoList: (todolistID: string) => void
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, value:string, todolistID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void
}

function TodoList(props: TodoListPropsType) {
    const tasksList = props.tasks.map(t => {
        const changeStatus =
            (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changeTaskTitle=(value:string) => props.changeTaskTitle(t.id, value, props.id)
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <EditableSpan title={t.title} onChange={changeTaskTitle}/>
                <button onClick={() => props.removeTask(t.id, props.id)}>x</button>
            </li>
        )
    })

    const setAllFilter = () => props.changeTodoListFilter("all", props.id)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.id)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.id)


    let allBtnClass = "";
    if (props.filter === "all") {
        allBtnClass = "active-filter"
    }
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""
   const addTask=(title:string)=>{
        props.addTask(title,props.id)
   }
    return (
        <div>
            <div>
                <h3>{props.title}
                    <button onClick={() => props.removeTodoList(props.id)}>x</button>
                </h3>
            </div>
          <AddItemForm addItem={addTask}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAllFilter}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilter}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={setCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;

