import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";
import {v1} from "uuid";
import {AddFormItem} from "./components/itemComponents/AddFormItem";
import IconButton from "@mui/material/IconButton/IconButton";
import {AppBar, Container, Grid, Paper, ScopedCssBaseline, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ButtonStyles} from "./ButtonStyles";
import Switch from '@mui/material/Switch'


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TodolistTaskStateType = {
    [key: string]: TasksType[]
}

type ThemeMode = 'dark' | 'light'

function App() {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#2d467c'
            }
        },
    });

    const changeThemeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>(
        [
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'},
        ]
    )
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id != todolistID))
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
    const changeTaskTitle = (taskId: string, newValue: string, todolistID: string) => {
        const updatedState = tasks[todolistID].find(t => t.id === taskId)
        if (updatedState) {
            updatedState.title = newValue
        }
        setTasks({...tasks})
    }

    const newTodolistTitle = (todolistID: string, titleValue: string) => {
        const todolist = todolists.find(el => el.id === todolistID)
        if (todolist) {
            todolist.title = titleValue
        }
        setTodolists([...todolists])
    }

    const changeTodoListFilter = (filter: FilterValuesType, todolistID: string) => {
        let todolist = todolists.find(el => el.id === todolistID)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }

    function addTodolist(title: string) {
        const todolist: TodolistType = {id: v1(), filter: 'all', title}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }


    return (
        <ThemeProvider theme={theme}>
            <ScopedCssBaseline>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton color={'inherit'}>
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <ButtonStyles background={theme.palette.primary.dark}>Log In</ButtonStyles>
                            <ButtonStyles background={theme.palette.primary.dark}>Sign In</ButtonStyles>
                            <ButtonStyles sx={{ml: '50px'}}>FAQ</ButtonStyles>
                            <Switch onChange={changeThemeModeHandler}/>
                        </div>
                    </Toolbar>
                </AppBar>

                <Container>
                    <Grid container sx={{mb: '30px'}}>
                        <AddFormItem addNewItem={addTodolist}/>
                    </Grid>

                    <Grid container>
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
                                    <Grid item sx={{m: '15px'}}>
                                        <Paper elevation={10} sx={{p: '25px', borderRadius: '10px'}}>
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
                                                changeTaskTitle={changeTaskTitle}
                                                newTodolistTitle={newTodolistTitle}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>

                </Container>
            </ScopedCssBaseline>
        </ThemeProvider>
    );
}

export default App;
