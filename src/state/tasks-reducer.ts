import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string

}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    isDone: boolean
    taskId: string

}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    title: string
    taskId: string

}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {

        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(f => f.id !== action.taskId)}

        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: 'juce', isDone: false}, ...state[action.todolistId]]
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    isDone: action.isDone
                } : task)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.title
                } : task)
            }

        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}

        case 'REMOVE-TODOLIST':
            let {[action.id]:[],...copyState}={...state}
            return copyState

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId,}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId: '2', isDone, todolistId}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId: '2', title, todolistId}
}
