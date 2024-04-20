import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState(
        [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS & React', isDone: false},
            {id: v1(), title: 'Python', isDone: false},
        ],
    )


    const [filterTasks, setFilterTasks] = useState<FilterValuesType>('all')

    const getFilteredTasks = (allTasks: Array<TasksType>, currentFilter: FilterValuesType): Array<TasksType> => {
        switch (currentFilter) {
            case 'active':
                return allTasks.filter(t => !t.isDone)

            case 'completed':
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks;
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filterTasks)

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilterTasks(filter)
    }


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


    return (
        <div className="App">
            <Todolist
                filter={filterTasks}
                title='What to learn'
                tasks={filteredTasks}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addNewTask={addNewTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
