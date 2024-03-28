import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";

function App() {
    return (
        <div className="App">
            <Todolist  title='What to buy'/>
            <Todolist  title='What to learn'/>
            <Todolist  title='Another'/>
        </div>
    );
}

export default App;
