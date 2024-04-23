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

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistsType[]>(
        [
            {id: todolistId1, title: 'What to learn', filter:'all'},
            {id: todolistId2, title: 'What to buy', filter:'completed'}
        ]
    )

    const removeTodolist = (todolistID: string) => {
        const filteredTodolist = todolists.filter(t => t.id != todolistID)
        setTodolists(filteredTodolist)
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS & React', isDone: false},
            {id: v1(), title: 'Python', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
        ]
    })

    const removeTask = (taskId: string, todolistID: string) => {
        const task = tasks[todolistID]
        tasks[todolistID] = task.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    const addNewTask = (title: string, todolistID: string) => {
        const newTask: TasksType = {
            id: v1(),
            title,
            isDone: false
        }
        const task = tasks[todolistID]
        tasks[todolistID] = [newTask, ...task]
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, isDoneValue: boolean, todolistID: string) => {
        const task = tasks[todolistID]
        const updatedState = task.find(t => t.id === taskId)
        if (updatedState) {
            updatedState.isDone = isDoneValue
        }
        setTasks({...tasks})
    }

    const changeTodoListFilter = (filter: FilterValuesType, todolistID: string) => {
        let todolist = todolists.find(el => el.id === todolistID)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">

            {
                todolists.map((el) => {

                    let tasksForTodolist = tasks[el.id]
                    if (el.filter==='active') {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone)
                    }
                    if (el.filter==='completed'){
                        tasksForTodolist = tasks[el.id].filter(t => !t.isDone)
                    }

                    return (
                        <Todolist
                            key={el.id}
                            todolistID={el.id}
                            filter={el.filter}
                            title={el.title}
                            removeTodolist={removeTodolist}
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
