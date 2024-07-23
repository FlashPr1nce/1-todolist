import React, {memo, useCallback, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./components/Todolist";
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
import { useSelector, useDispatch } from 'react-redux';
import { AppRootStateType } from './model/store';

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

export const AppWithRedux = memo(() => {

    console.log('APP');

    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#2d467c'
            }
        },
    });

    const changeThemeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    const dispatch = useDispatch();

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);

    const removeTodolist = useCallback((todolistID: string) => {
        const action = removeTodolistAC(todolistID);
        dispatch(action);
    }, [dispatch]);

    const newTodolistTitle = useCallback((todolistID: string, titleValue: string) => {
        dispatch(newTodolistTitleAC(todolistID, titleValue));
    }, [dispatch]);

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todolistID: string) => {
        dispatch(changeTodoListFilterAC(filter, todolistID));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    const tasks = useSelector<AppRootStateType, TodolistTaskStateType>(state => state.tasks);

    const removeTask = useCallback((taskId: string, todolistID: string) => {
        dispatch(removeTaskAC(taskId, todolistID));
    }, [dispatch]);

    const addNewTask = useCallback((title: string, todolistID: string) => {
        const action = addTaskAC(todolistID, title);
        dispatch(action);
    }, [dispatch]);

    const changeTaskStatus = useCallback((taskId: string, isDoneValue: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDoneValue, todolistID));
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskId: string, newValue: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskId, newValue, todolistID));
    }, [dispatch]);

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
                        {todolists.map((el) => {
                            return (
                                <Grid item key={el.id} sx={{m: '15px'}}>
                                    <Paper elevation={10} sx={{p: '25px', borderRadius: '10px'}}>
                                        <Todolist
                                            todolistID={el.id}
                                            filter={el.filter}
                                            title={el.title}
                                            removeTodolist={removeTodolist}
                                            tasks={tasks[el.id]}
                                            removeTask={removeTask}
                                            changeTodoListFilter={changeTodoListFilter}
                                            addNewTask={addNewTask}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            newTodolistTitle={newTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </ScopedCssBaseline>
        </ThemeProvider>
    );
});
