import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from "../../App";
import {AddFormItem} from "../itemComponents/add-form-item/AddFormItem";
import {EditableSpan} from "../itemComponents/editable-span/EditableSpan";
import {Btn} from "../itemComponents/button/Button";
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Box,  List} from "@mui/material";
import {TaskItem} from "../tasks/TaskItem";

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

export const Todolist = memo(({
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

    console.log('TODOLIST');

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    let tasksList;
    if (tasksForTodolist.length === 0) {
        tasksList = <span>List is empty</span>;
    } else {
        tasksList = (
            <List>
                {
                    tasksForTodolist.map((t: TasksType) => (
                        <TaskItem key={t.id}
                                  task={t}
                                  todolistID={todolistID}
                                  removeTask={removeTask}
                                  changeTaskStatus={changeTaskStatus}
                                  changeTaskTitle={changeTaskTitle}/>
                    ))
                }
            </List>
        );
    }

    const removeTodolists = useCallback(() => {
        removeTodolist(todolistID);
    }, [removeTodolist, todolistID]);

    const addTask = useCallback((title: string) => {
        addNewTask(title, todolistID);
    }, [addNewTask, todolistID]);

    const changeTodolistTitle = useCallback((titleValue: string) => {
        newTodolistTitle(todolistID, titleValue);
    }, [newTodolistTitle, todolistID]);


    const onAllClickHandler = useCallback(() => {
        changeTodoListFilter('all', todolistID);
    }, [changeTodoListFilter, todolistID]);

    const onActiveClickHandler = useCallback(() => {
        changeTodoListFilter('active', todolistID);
    }, [changeTodoListFilter, todolistID]);

    const onCompletedClickHandler = useCallback(() => {
        changeTodoListFilter('completed', todolistID);
    }, [changeTodoListFilter, todolistID]);

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
                         onClickHandler={onAllClickHandler}/>
                    <Btn variant={filter === 'active' ? 'contained' : 'text'} title={'Active'}
                         onClickHandler={onActiveClickHandler}/>
                    <Btn variant={filter === 'completed' ? 'contained' : 'text'} title={'Completed'}
                         onClickHandler={onCompletedClickHandler}/>
                </Box>
            </div>
        </div>
    );
});
