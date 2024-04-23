import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from "./itemComponents/Button";
import {FilterValuesType} from "../App";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsTypeTodolist = {
    title: string,

    tasks: Array<TasksType>,
    removeTask: (taskId: string) => void,
    changeTodoListFilter: (filter: FilterValuesType, todolistsID: string) => void,

    addNewTask: (title: string) => void,
    changeTaskStatus: (taskId: string, isDoneValue: boolean) => void,
    filter: FilterValuesType,

    todolistsID: string
}

const Todolist = ({
                      title,
                      tasks,
                      removeTask,
                      changeTodoListFilter,
                      addNewTask,
                      changeTaskStatus,
                      filter,
                      todolistsID
                  }: PropsTypeTodolist) => {

        const [taskTitle, setTaskTitle] = React.useState('')
        const [inputError, setInputError] = useState<boolean>(false)

        let tasksList;
        if (tasks.length === 0) {
            tasksList = <span>List is empty</span>
        } else tasksList = <ul>
            {
                tasks.map((t: TasksType) => {

                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(t.id, e.currentTarget.checked)
                    }

                    return (
                        <li key={t.id}>
                            <input type="checkbox"
                                   onChange={changeTaskStatusHandler}
                                   checked={t.isDone}/>
                            <span className={t.isDone ? 'is-done' : ''}>{t.title}</span>
                            <Button title={'x'} onClickHandler={() => removeTask(t.id)}/>
                        </li>
                    )
                })
            }
        </ul>

        const addTaskHandler = () => {
            const trimmedTaskTitle = taskTitle.trim()
            if (trimmedTaskTitle) {
                addNewTask(taskTitle.trim())
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

        const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTaskTitle(e.currentTarget.value)
        }

        return (
            <div className={'stylesTodolist'}>
                <div>
                    <h3>{title}</h3>
                    <div>
                        <input
                            className={inputError ? 'warning-input' : ''}
                            value={taskTitle}
                            onChange={setTaskTitleHandler}
                            onKeyDown={onKeyDownHandler}
                        />
                        <Button title={'+'} onClickHandler={addTaskHandler} isDisabled={!taskTitle}/>
                        {taskTitle.length > 15 && <h4>Text can`t exceed 15 symbols</h4>}
                        <span className={inputError ? 'warning-span' : 'request-span'}>Please enter your task</span>
                    </div>

                    {tasksList}

                    <div>
                        <Button classes={`btn-filter ${filter === 'all' ? 'btn-filter-active' : ''}`} title={'All'}
                                onClickHandler={() => changeTodoListFilter('all', todolistsID)}/>
                        <Button classes={`btn-filter ${filter === 'active' ? 'btn-filter-active' : ''}`} title={'Active'}
                                onClickHandler={() => changeTodoListFilter('active', todolistsID)}/>
                        <Button classes={`btn-filter ${filter === 'completed' ? 'btn-filter-active' : ''}`} title={'Completed'}
                                onClickHandler={() => changeTodoListFilter('completed', todolistsID)}/>
                    </div>
                </div>
            </div>
        );
    }
;

export default Todolist;