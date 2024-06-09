import React, {useReducer, useState} from 'react';
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
import {
    addTodolistAC,
    changeTodoListFilterAC,
    newTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./model/tasks-reducer/tasks-reducer";
import { useSelector } from 'react-redux';
import { AppRootStateType } from './model/store';
import { useDispatch } from 'react-redux';


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TodolistTaskStateType = {
    [key: string]: TasksType[]
}

type ThemeMode = 'dark' | 'light'

function AppWithRedux() {
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

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const removeTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
    }

    const newTodolistTitle = (todolistID: string, titleValue: string) => {
        dispatch(newTodolistTitleAC(todolistID, titleValue))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todolistID: string) => {
        dispatch(changeTodoListFilterAC(filter, todolistID))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const tasks = useSelector<AppRootStateType, TodolistTaskStateType>(state => state.tasks)

    const removeTask = (taskId: string, todolistID: string) => {
        dispatch(removeTaskAC(taskId, todolistID))
    }

    const addNewTask = (title: string, todolistID: string) => {
        const action = addTaskAC(todolistID, title)
        dispatch(action)
    }

    const changeTaskStatus = (taskId: string, isDoneValue: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDoneValue, todolistID))
    }
    const changeTaskTitle = (taskId: string, newValue: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskId, newValue, todolistID))
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

                <Container sx={{minHeight: '100vh'}}>
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

export default AppWithRedux;
