import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},

        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Meat", isDone: true},

        ]
    })

    const removeTask = (taskID: string, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks({...tasks})
    }
    const changeTaskTitle = (taskID: string, value:string, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, title:value} : t)
        setTasks({...tasks})
    }
    const changeTodoListFilter = (filter: FilterValuesType, todolistID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    //UI:
    const TodoListsComponents = todoLists.map(tl => {
        let tasksForRender = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForRender = tasks[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForRender = tasks[tl.id].filter(t => t.isDone === true)
        }
        return (
            <div className="App">
                <TodoList // TodoList()
                    removeTodoList={removeTodoList}
                    key={tl.id}
                    id={tl.id}
                    filter={tl.filter}
                    title={tl.title}
                    tasks={tasksForRender}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTodoListFilter={changeTodoListFilter}
                    changeTaskTitle={changeTaskTitle}
                />
            </div>
        )
    })

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {id:v1(),title:title,filter:'all'}
        setTodoLists([todolist, ...todoLists])
          setTasks({...tasks,[todolist.id]:[]})
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {TodoListsComponents}
        </div>
    );
}

export default App;
