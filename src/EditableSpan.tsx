import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange:(value:string)=>void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let[editMode,setEditMode]=useState(false)
    let[title,setTitle]=useState('')
    const activateEditMode=()=>{
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode=()=>{
        setEditMode(false)
        props.onChange(title)
    }
    const OnChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input value={title} autoFocus onBlur={activateViewMode} onChange={OnChangeHandler} />
            : <span onDoubleClick={activateEditMode} /*className={!props.isDone ? "notCompleted" : ""}*/>{props.title}</span>
    )
}