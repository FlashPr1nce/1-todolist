import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "../App";
import {AddFormItem} from "./itemComponents/AddFormItem";
import {EditableSpan} from "./itemComponents/EditableSpan";
import {Btn} from "./itemComponents/Button";
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Box, Checkbox, List, ListItem} from "@mui/material";

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
    changeTaskTitle: (taskId: string, newTitle: string, todolistID: string) => void,
    newTodolistTitle: (todolistID: string, titleValue: string) => void,

    filter: FilterValuesType,

    todolistID: string,
    removeTodolist: (todolistID: string) => void
}

const Todolist = ({
                      title,
                      tasks,
                      removeTask,
                      changeTodoListFilter,
                      addNewTask,
                      changeTaskStatus,
                      changeTaskTitle,
                      newTodolistTitle,
                      filter,
                      todolistID,
                      removeTodolist
                  }: PropsTypeTodolist) => {


        let tasksList;
        if (tasks.length === 0) {
            tasksList = <span>List is empty</span>
        } else tasksList = <List>
            {
                tasks.map((t: TasksType) => {

                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(t.id, e.currentTarget.checked, todolistID)
                    }
                    const changeTitleHandler = (newValue: string) => {
                        changeTaskTitle(t.id, newValue, todolistID)
                    }

                    return (
                        <ListItem key={t.id}
                                  sx={{
                                      p: '0',
                                      justifyContent: 'space-between'
                                  }}
                        >
                            <>
                                <Checkbox onChange={changeTaskStatusHandler}
                                          checked={t.isDone}
                                          sx={{ml:'25px'}}
                                />
                                <EditableSpan className={t.isDone ? 'is-done' : ''} title={t.title}
                                              onChange={changeTitleHandler}/>
                            </>

                            <IconButton onClick={() => removeTask(t.id, todolistID)}
                                        sx={{mr:'25px',
                                            opacity: t.isDone ? '0.5' : ''
                                        }}>
                                <Delete/>
                            </IconButton>
                        </ListItem>
                    )
                })
            }
        </List>

        const removeTodolists = () => {
            removeTodolist(todolistID)
        }

        const addTask = (title: string) => {
            addNewTask(title, todolistID)
        }

        const changeTodolistTitle = (titleValue: string) => {
            newTodolistTitle(todolistID, titleValue)
        }

        return (
            <div className={'stylesTodolist'}>
                <div>
                    <h3>
                        <EditableSpan title={title} onChange={changeTodolistTitle}/>
                        <IconButton onClick={removeTodolists}>
                            <Delete/>
                        </IconButton>
                    </h3>

                    <div>
                        <AddFormItem addNewItem={addTask}/>
                    </div>

                    {tasksList}

                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Btn variant={filter === 'all' ? 'contained' : 'text'}
                             title={'All'}
                             onClickHandler={() => changeTodoListFilter('all', todolistID)}/>
                        <Btn variant={filter === 'active' ? 'contained' : 'text'} title={'Active'}
                             onClickHandler={() => changeTodoListFilter('active', todolistID)}/>
                        <Btn variant={filter === 'completed' ? 'contained' : 'text'} title={'Completed'}
                             onClickHandler={() => changeTodoListFilter('completed', todolistID)}/>
                    </Box>
                </div>
            </div>
        );
    }
;

export default Todolist;