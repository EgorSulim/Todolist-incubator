import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    title: string
    onChange:(title:string)=>void
}

export const EditMode = (props: AddItemFormPropsType) => {
    let [title,setTitle]=useState('')
    let [editMode, setEditMode] = useState(true)
    const activateEditMode = () => {setEditMode(false)
    setTitle(props.title)}

    const deactivateEditMode = () => {setEditMode(true)
    props.onChange(title)
    }
    const onChange=(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.currentTarget.value)
    return editMode
        ? <span onDoubleClick={activateEditMode}>{props.title}</span>
        : <TextField variant='outlined' value={title} onChange={onChange} onBlur={deactivateEditMode} autoFocus/>
}