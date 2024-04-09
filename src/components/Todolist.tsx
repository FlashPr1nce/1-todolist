import React, {useRef} from 'react';
import {Button} from "./itemComponents/Button";
import {FilterValuesType} from "../App";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsTypeTodolist = {
    title: string,

    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void

    addNewTask: (title: string) => void
}

const Todolist = ({title, tasks, removeTask, changeTodoListFilter, addNewTask}: PropsTypeTodolist) => {

    const taskTitleInput = useRef<HTMLInputElement>(null)


    let tasksList;

    if (tasks.length === 0) {
        tasksList = <span>List is empty</span>
    } else tasksList = <ul>
        {
            tasks.map((t: TasksType) => {
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button title={'x'} onClickHandler={() => removeTask(t.id)}/>
                    </li>
                )
            })
        }
    </ul>

    // const tasksList: JSX.Element = tasks.length === 0
    //     ?
    //     <span>List is empty</span>
    //
    //     : <ul>
    //         {
    //             tasks.map((task: TasksType) => {
    //                 return (
    //                     <li key={task.id}>
    //                         <input type="checkbox" checked={task.isDone}/>
    //                         <span>{task.title}</span>
    //                         <Button title={'x'} onClickHandler={() => removeTask(task.id)}/>
    //                     </li>
    //                 )
    //             })
    //         }
    //     </ul>

    const addTask = () => {
        if (taskTitleInput.current) {
            addNewTask(taskTitleInput.current.value)
            taskTitleInput.current.value = ' '
        }
    }


return (
    <div className={'stylesTodolist'}>
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={taskTitleInput}/>
                <Button title={'+'} onClickHandler={addTask}/>
            </div>

            {tasksList}

            <div>
                <Button title={'All'}
                        onClickHandler={() => changeTodoListFilter('all')}/>
                <Button title={'Active'} onClickHandler={() => changeTodoListFilter('active')}/>
                <Button title={'Completed'} onClickHandler={() => changeTodoListFilter('completed')}/>
            </div>
        </div>
    </div>
);
}
;

export default Todolist;