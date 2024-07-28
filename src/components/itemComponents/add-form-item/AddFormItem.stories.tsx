import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {AddFormItem} from "./AddFormItem";
import {action} from '@storybook/addon-actions'
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";

const meta = {
    title: 'TODOLISTS/AddFormItem',
    component: AddFormItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

    argTypes: {
        addNewItem: {
            description: 'Button clicked inside form'
        }
    },
    args: {addNewItem: fn()},
} satisfies Meta<typeof AddFormItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddFormItemStory: Story = {};

export const AddFormItem1 = () => <AddFormItem addNewItem={action('addNewItem')}/>

export const AddFormItemWithError: Story = {

      render: (args) => {

        const [taskTitle, setTaskTitle] = React.useState('')
        const [inputError, setInputError] = useState<boolean>(true)

        const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
          setTaskTitle(e.currentTarget.value)
        }

        const addTaskHandler = useCallback( () => {
          const trimmedTaskTitle = taskTitle.trim()
          if (trimmedTaskTitle) {
            args.addNewItem(taskTitle.trim())
          } else {
            setInputError(true)
            setTimeout(() => (setInputError(false)), 4000)
          }
          setTaskTitle('')
        }, [taskTitle, args.addNewItem])

        const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            addTaskHandler()
          }
        }

        return <>
            <TextField
                label={inputError ? 'Please fill in the input field' : 'Enter field'}
                size={'small'}
                error={!!inputError}
                variant={'outlined'}
                value={taskTitle}
                onChange={setTaskTitleHandler}
                onKeyDown={onKeyDownHandler}/>

      <IconButton onClick={addTaskHandler} disabled={!taskTitle} color={'primary'}>
        <AddBoxIcon />
      </IconButton>
      {taskTitle.length > 15 && <h4>Text can`t exceed 15 symbols</h4>}
        </>
    }
}

