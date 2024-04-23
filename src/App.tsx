import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


function App() {

    const [tasks, setTasks] = useState(
        [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS & React', isDone: false},
            {id: v1(), title: 'Python', isDone: false},
        ],
    )


    const removeTask = (taskId: string) => {
        const updatedState = tasks.filter(t => t.id !== taskId)
        setTasks(updatedState)
    }

    const addNewTask = (title: string) => {
        const newTask: TasksType = {
            id: v1(),
            title,
            isDone: false
        }

        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDoneValue: boolean) => {
        const updatedState = tasks.map(t => t.id === taskId ? {...t, isDone: isDoneValue} : t)
        setTasks(updatedState)
    }


    const [todolists, setTodolists] = useState<TodolistsType[]>(
        [
            {id: v1(), title: 'What to learn', filter:'all'},
            {id: v1(), title: 'What to buy', filter:'completed'}
        ]
    )

    const changeTodoListFilter = (filter: FilterValuesType, todolistsID: string) => {
        let todolist = todolists.find(el => el.id === todolistsID)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">

            {
                todolists.map((el) => {

                    let tasksForTodolist = tasks
                    if (el.filter==='active') {
                        tasksForTodolist = tasks.filter(t => t.isDone)
                    }
                    if (el.filter==='completed'){
                        tasksForTodolist = tasks.filter(t => !t.isDone)
                    }

                    return (
                        <Todolist
                            key={el.id}
                            todolistsID={el.id}
                            filter={el.filter}
                            title={el.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeTodoListFilter={changeTodoListFilter}
                            addNewTask={addNewTask}
                            changeTaskStatus={changeTaskStatus}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
