import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from "./itemComponents/Button";
import {FilterValuesType} from "../App";
import {AddFormItem} from "./itemComponents/AddFormItem";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsTypeTodolist = {
    title: string,

    tasks: Array<TasksType>,
    removeTask: (taskId: string, todolistID: string) => void,
    changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void,

    addNewTask: (title: string, todolistID: string) => void,
    changeTaskStatus: (taskId: string, isDoneValue: boolean, todolistID: string) => void,
    filter: FilterValuesType,

    todolistID: string
    removeTodolist: (todolistID: string) => void
}

const Todolist = ({
                      title,
                      tasks,
                      removeTask,
                      changeTodoListFilter,
                      addNewTask,
                      changeTaskStatus,
                      filter,
                      todolistID,
                      removeTodolist
                  }: PropsTypeTodolist) => {


        let tasksList;
        if (tasks.length === 0) {
            tasksList = <span>List is empty</span>
        } else tasksList = <ul>
            {
                tasks.map((t: TasksType) => {

                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(t.id, e.currentTarget.checked, todolistID)
                    }

                    return (
                        <li key={t.id}>
                            <input type="checkbox"
                                   onChange={changeTaskStatusHandler}
                                   checked={t.isDone}/>
                            <span className={t.isDone ? 'is-done' : ''}>{t.title}</span>
                            <Button title={'x'} onClickHandler={() => removeTask(t.id, todolistID)}/>
                        </li>
                    )
                })
            }
        </ul>

        const removeTodolists = () => {
            removeTodolist(todolistID)
        }

        const addTask = (title: string) =>{
            addNewTask(title, todolistID)
        }

        return (
            <div className={'stylesTodolist'}>
                <div>
                    <h3>
                        {title}
                        <button onClick={removeTodolists}>x</button>
                    </h3>

                    <div>
                        <AddFormItem addNewItem={addTask}/>
                    </div>

                    {tasksList}

                    <div>
                        <Button classes={`btn-filter ${filter === 'all' ? 'btn-filter-active' : ''}`} title={'All'}
                                onClickHandler={() => changeTodoListFilter('all', todolistID)}/>
                        <Button classes={`btn-filter ${filter === 'active' ? 'btn-filter-active' : ''}`} title={'Active'}
                                onClickHandler={() => changeTodoListFilter('active', todolistID)}/>
                        <Button classes={`btn-filter ${filter === 'completed' ? 'btn-filter-active' : ''}`} title={'Completed'}
                                onClickHandler={() => changeTodoListFilter('completed', todolistID)}/>
                    </div>
                </div>
            </div>
        );
    }
;

export default Todolist;