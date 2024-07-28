import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../itemComponents/editable-span/EditableSpan";
import {TasksType} from "../todolists/Todolist";

type TaskItemProps = {
    task: TasksType,
    todolistID: string,
    removeTask: (taskId: string, todolistID: string) => void,
    changeTaskStatus: (taskId: string, isDoneValue: boolean, todolistID: string) => void,
    changeTaskTitle: (taskId: string, newTitle: string, todolistID: string) => void,
}

export const TaskItem = memo(({
                                  task,
                                  todolistID,
                                  removeTask,
                                  changeTaskStatus,
                                  changeTaskTitle
                              }: TaskItemProps) => {

    console.log('TASK IS CALLED')

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked, todolistID);
    }, [task.id, todolistID, changeTaskStatus]);

    const changeTitleHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistID);
    }, [task.id, todolistID, changeTaskTitle]);

    const removeTaskHandler = useCallback(() => {
        removeTask(task.id, todolistID);
    }, [task.id, todolistID, removeTask]);

    return (
        <ListItem key={task.id}
                  sx={{
                      p: '0',
                      justifyContent: 'space-between'
                  }}
        >
            <>
                <Checkbox onChange={changeTaskStatusHandler}
                          checked={task.isDone}
                          sx={{ml: '25px'}}
                />
                <EditableSpan className={task.isDone ? 'is-done' : ''} title={task.title}
                              onChange={changeTitleHandler}/>
            </>

            <IconButton onClick={removeTaskHandler}
                        sx={{
                            mr: '25px',
                            opacity: task.isDone ? '0.5' : ''
                        }}>
                <Delete/>
            </IconButton>
        </ListItem>
    );
})
