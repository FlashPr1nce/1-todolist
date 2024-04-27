import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";
import {v1} from "uuid";
import {AddFormItem} from "./components/itemComponents/AddFormItem";


export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TodolistTaskStateType = {
    [key: string]: TasksType[]
}



function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistsType[]>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},
        ]
    )

    const removeTodolist = (todolistID: string) => {
        const filteredTodolist = todolists.filter(t => t.id != todolistID)
        setTodolists(filteredTodolist)
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    const [tasks, setTasks] = useState<TodolistTaskStateType>({
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
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    const addNewTask = (title: string, todolistID: string) => {
        const newTask: TasksType = {id: v1(), title, isDone: false}
        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks})
    }

    const changeTaskStatus = (taskId: string, isDoneValue: boolean, todolistID: string) => {
        const updatedState = tasks[todolistID].find(t => t.id === taskId)
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

    function addTodolist(title:string) {
        const todolist: TodolistsType = {id: v1(), filter: 'all', title}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    return (
        <div className="App">

            <AddFormItem addNewItem={addTodolist}/>

            {
                todolists.map((el) => {

                    let tasksForTodolist = tasks[el.id]
                    if (el.filter === 'active') {
                        tasksForTodolist = tasks[el.id].filter(t => !t.isDone)
                    }
                    if (el.filter === 'completed') {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone)
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
