import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@mui/material";


type EditableSpanPropsType = {
    title: string
    className?: string

    onChange: (newValue: string) => void
}
export const EditableSpan = memo( ({title, className, onChange}: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [titleState, setTitleState] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitleState(title)
    }
    const activeViewMode = () => {
        setEditMode(false)
        onChange(titleState)
    }

    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activeViewMode();
        }
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitleState(e.currentTarget.value)

    console.log('EditableSpan')

    return (
        editMode
            ?
            <TextField
                label={'Edit mode'}
                value={titleState}
                size={'small'}
                onKeyUp={onKeyUpHandler}
                onBlur={activeViewMode} autoFocus
                onChange={changeTitleHandler}/>
            :
            <span className={className} onDoubleClick={activateEditMode}>{title}</span>


    )
        ;
} )
