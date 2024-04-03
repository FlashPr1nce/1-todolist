import React from 'react';
import {Button} from "./itemComponents/Button";

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

type PropsTypeTodolist = {
    title: string,

    tasks: Array<TasksType>
    removeTask:  (taskId: number) => void
}

const Todolist = ({title, tasks, removeTask}: PropsTypeTodolist) => {

    let tasksList;

    if (tasks.length === 0) {
        tasksList = <span>List is empty</span>
    }
    else tasksList = <ul>
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

    return (
        <div className={'stylesTodolist'}>
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <Button title={'+'}/>
                </div>

                {tasksList}

                <div>
                    <Button title={'All'}/>
                    <Button title={'Active'}/>
                    <Button title={'Completed'}/>
                </div>
            </div>
        </div>
    );
};

export default Todolist;