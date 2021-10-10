import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Car", isDone: false},]
    });

    let [todolists, setTodolists] = useState<Array<TodolistPropsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    function removeTask(id: string, todolistId: string) {
        let tasksFromTodolist = tasks[todolistId].filter(ft => ft.id !== id)
        tasks[todolistId] = tasksFromTodolist
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let task = tasks[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }


    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist=todolists.find(f=>f.id===todolistID)
        if(todolist){
            todolist.filter=value
            setTodolists([...todolists])
        }
    }
    function removeTodolist(todolistID:string){
        setTodolists(todolists.filter(f=>f.id!==todolistID))
        delete(tasks[todolistID])
    }

    function onChange(title:string,todolistId:string,taskId:string){
        let tasksTodolist=tasks[todolistId]
        let task=tasksTodolist.find(f=>f.id===taskId)
        if(task){
            task.title=title
            setTasks({...tasks})
        }
    }

    function onChangeTodolist(title:string,todolistID:string){
        let todolist=todolists.find(f=>f.id===todolistID)
        if(todolist){
            todolist.title=title;
            setTodolists([...todolists])
        }
    }

    function addItem(title:string){
        let todolistId=v1()
        let newTodolist:TodolistPropsType={id:todolistId,title:title,filter:'all'}
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks,[todolistId]:[]})
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px'}}><AddItemForm addItem={addItem} title={'dsd'}/></Grid>
                <Grid container spacing={3}>{todolists.map(tl => {
                    let tasksFilterable = tasks[tl.id]
                    let tasksForTodolist = tasksFilterable;

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksFilterable.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksFilterable.filter(t => t.isDone === true);
                    }
                    return (
                        <Grid item><Paper style={{padding:'10px'}}><Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            onChange={onChange}
                            onChangeTodolist={onChangeTodolist}
                        /></Paper></Grid>)
                })}</Grid></Container>
        </div>
    );
}

export default App;

