import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import React, {useState} from "react";
import {TaskItem} from "./TaskItem";
import {v1} from "uuid";

const meta = {

    title: 'TODOLISTS/TaskItem',
    component: TaskItem,
    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],

    argTypes: {

    },

    args: {
        task: {id: 'sometaskid', isDone: false, title: 'REACT'},
        todolistID: 'sometodolistid',
        removeTask: fn(),
        changeTaskStatus: fn(),
        changeTaskTitle: fn(),
    },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskIsNodDoneStory: Story = {

};

export const TaskIsDoneStory: Story = {
    args: {
        task: {id: 'sometaskid', isDone: true, title: 'REACT'},
    },
};

export const TaskToggleStory: Story = {

    render: (args) => {

        const [task, setTask] = useState({id: v1(), isDone: false, title: 'REACT'})

        const changeTaskTitleHandler = (titleId: string, title: string) => {
            setTask({...task, title: title})
        }

        const changeTaskStatusHandler = () => {
            setTask({...task, isDone: !task.isDone})
        }

        return <TaskItem
            task={task}
            todolistID={'sometodolistid'}
            changeTaskTitle={changeTaskTitleHandler}
            changeTaskStatus={changeTaskStatusHandler}
            removeTask={args.removeTask}/>
    }

};