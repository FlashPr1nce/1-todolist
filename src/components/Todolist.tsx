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
}


const Todolist = ({title, tasks}: PropsTypeTodolist) => {
    return (
        <div>
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <Button title={'+'}/>
                </div>
                <ul>
                    <li><input type="checkbox" checked={tasks[0].isDone}/> <span>{tasks[0].title}</span></li>
                    <li><input type="checkbox" checked={tasks[1].isDone}/> <span>{tasks[1].title}</span></li>
                    <li><input type="checkbox" checked={tasks[2].isDone}/> <span>{tasks[2].title}</span></li>
                </ul>
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