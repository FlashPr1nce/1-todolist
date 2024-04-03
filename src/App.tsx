import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/Todolist";

function App() {

    const[tasks, setTasks] = useState(
        [
            {id: 1, title: 'HTML', isDone: true},
            {id: 2, title: 'CSS', isDone: true},
            {id: 3, title: 'JS & React', isDone: false}
        ]
    )


    const removeTask = (taskId: number) => {
        const updatedState = tasks.filter(t => t.id !== taskId)
        setTasks(updatedState)
    }


    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
