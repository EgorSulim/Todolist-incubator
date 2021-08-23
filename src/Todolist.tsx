import React from 'react';

type propsType = {
    title: string
    task: Array<typeForTask>
    removeTask: Function
}

type typeForTask = {
    id: number
    title: string
    isDone: boolean
}
export const Todolist = (props: propsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map((elementTask) => {
                    return (
                        <li>
                            <input type="checkbox" checked={elementTask.isDone}/> <span>{elementTask.title}</span>
                            <button onClick={() => {
                                props.removeTask(elementTask.id)
                            }}>x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

