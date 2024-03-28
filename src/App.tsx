import React from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";


let task1: TasksType[] = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: true},
    {id: 3, title: 'JS', isDone: false}
]

let task2: Array<TasksType> = [
    {id: 4, title: 'Bread', isDone: false},
    {id: 5, title: 'Beer', isDone: false},
    {id: 6, title: 'Meat', isDone: true}
]

function App() {
    return (
        <div className="App">
            <Todolist  title='What to learn' tasks={task1}/>
            <Todolist  title='What to buy' tasks={task2}/>
        </div>
    );
}

export default App;
