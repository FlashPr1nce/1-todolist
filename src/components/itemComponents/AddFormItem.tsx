import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import {TasksType} from "../Todolist";

type AddFormItemPropsItem = {
    addNewItem: (title: string) => void,
}

export const AddFormItem = ({addNewItem}: AddFormItemPropsItem) => {

    const [taskTitle, setTaskTitle] = React.useState('')
    const [inputError, setInputError] = useState<boolean>(false)

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addNewItem(taskTitle.trim())
        } else {
            setInputError(true)
            setTimeout(() => (setInputError(false)), 4000)
        }
        setTaskTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <input
                className={inputError ? 'warning-input' : ''}
                value={taskTitle}
                onChange={setTaskTitleHandler}
                onKeyDown={onKeyDownHandler}
            />
            <Button title={'+'} onClickHandler={addTaskHandler} isDisabled={!taskTitle}/>
            {taskTitle.length > 15 && <h4>Text can`t exceed 15 symbols</h4>}
            <span className={inputError ? 'warning-span' : 'request-span'}>Please fill in the input field</span>
        </div>
    );
};

