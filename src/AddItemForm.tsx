import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(title)
        } else {
            setError(true)
        }
        setTitle("")
    }
    return (
        <div>
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div style={{color: "red"}}>Title is required!</div>}
        </div>
    )
}