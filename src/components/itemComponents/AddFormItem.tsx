import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import {TextField, IconButton} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

type AddFormItemPropsItem = {
    addNewItem: (title: string) => void,
}

export const AddFormItem = memo(({addNewItem}: AddFormItemPropsItem) => {

    console.log('AddFormItem')

    const [taskTitle, setTaskTitle] = React.useState('')
    const [inputError, setInputError] = useState<boolean>(false)

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = useCallback( () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addNewItem(taskTitle.trim())
        } else {
            setInputError(true)
            setTimeout(() => (setInputError(false)), 4000)
        }
        setTaskTitle('')
    }, [taskTitle, addNewItem])

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <TextField
                label={inputError ? 'Please fill in the input field' : 'Enter field'}
                size={'small'}
                error={!!inputError}
                variant={'outlined'}
                value={taskTitle}
                onChange={setTaskTitleHandler}
                onKeyDown={onKeyDownHandler}/>

            {/*<Btn variant={'contained'} color={'primary'} title={'+'} onClickHandler={addTaskHandler}*/}
            {/*     isDisabled={!taskTitle}/>*/}
            <IconButton onClick={addTaskHandler} disabled={!taskTitle} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
            {taskTitle.length > 15 && <h4>Text can`t exceed 15 symbols</h4>}
        </div>
    );
});

