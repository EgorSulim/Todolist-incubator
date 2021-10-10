import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {EditMode} from "./EditMode";
import {Button, Checkbox, IconButton, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistId: string) => void
    onChange: (title: string, todolistId: string, taskId: string) => void
    onChangeTodolist: (title: string, todolistID: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim(), props.id);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id)
    const onChangeTodolist = (title: string) => {
        props.onChangeTodolist(title, props.id)
    }
    return <div>
        <h3><EditMode title={props.title} onChange={onChangeTodolist}/> <IconButton
            onClick={removeTodolist}><Delete/></IconButton></h3>
        <div>
            <TextField
                variant='outlined'
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
                label='Title'
            />
            <IconButton onClick={addTask}><AddBox/></IconButton>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }

                    const onChange = (title: string) => props.onChange(title, props.id, t.id)

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            color='primary'
                            onChange={onChangeHandler}
                            checked={t.isDone}/>
                        <EditMode title={t.title} onChange={onChange}/>
                        <Button variant='text' onClick={onClickHandler}>x</Button>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter==='all'?'outlined':'text'}
                    onClick={onAllClickHandler} color='default'>All</Button>
            <Button variant={props.filter==='active'?'outlined':'text'}
                    onClick={onActiveClickHandler} color='primary'>Active</Button>
            <Button variant={props.filter==='completed'?'outlined':'text'}
                    onClick={onCompletedClickHandler} color='secondary'>Completed</Button>
        </div>
    </div>
}
