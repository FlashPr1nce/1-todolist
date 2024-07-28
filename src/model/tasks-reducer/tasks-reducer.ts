import {TodolistTaskStateType} from "../../App";
import {TasksType} from "../../components/todolists/Todolist";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "../todolists-reducer/todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        todolistID: string,
        taskId: string
    }
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    payload: {
        todolistID: string,
        title: string
    }
}

export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        todolistID: string,
        taskId: string,
        isDoneValue: boolean
    }
}

export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE',
    payload: {
        todolistID: string,
        taskId: string,
        newValue: string
    }
}

export type ActionTypesTasks = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusType | ChangeTaskTitleType |
    //ДАННЫЙ ТИП МЫ ИМПОРТИРОВАЛИ ИЗ РЕДЬЮСЕРА ТУДУЛИСТА
    AddTodolistActionType |
    //ДАННЫЙ ТИП МЫ ИМПОРТИРОВАЛИ ИЗ РЕДЬЮСЕРА ТУДУЛИСТА
    RemoveTodolistActionType

export let InitialStateTasks: TodolistTaskStateType = {}

export const tasksReducer = (state = InitialStateTasks, action: ActionTypesTasks) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const {todolistID, taskId} = action.payload;
            return {
                ...state,
                [todolistID]: state[todolistID].filter(t => t.id !== taskId)
            };
        }
        case 'ADD-TASK': {
            const {todolistID, title} = action.payload
            const newTask: TasksType = {id: v1(), title, isDone: false}
            state[todolistID] = [newTask, ...state[todolistID]]
            return {...state}
        }
        case 'CHANGE-TASK-STATUS': {
            const {todolistID, taskId, isDoneValue} = action.payload
            let todolistTasks = state[todolistID];
            let newTasksArray = todolistTasks
                .map(t => t.id === taskId ? {...t, isDone: isDoneValue} : t);
            state[todolistID] = newTasksArray
            return ({...state});
        }

        case 'CHANGE-TASK-TITLE': {
            const {todolistID, taskId, newValue} = action.payload
            const updatedState = state[todolistID].find(t => t.id === taskId)
            if (updatedState) {
                updatedState.title = newValue
            }
            state[todolistID] = [...state[todolistID]]
            return {...state}
        }

        //ЗДЕСЬ МЫ СОЗДАЕМ КЕЙС ДЛЯ ПРОВЕРКИ ДОБАВЛЕНИЯ НОВОГО ТУДУЛИСТА
        case "ADD-TODOLIST": {
            const {todolistID} = action.payload
            return {
                ...state,
                [todolistID]: []
            }
        }
        //ЗДЕСЬ МЫ СОЗДАЕМ КЕЙС ДЛЯ ПРОВЕРКИ УДАЛЕНИЯ НОВОГО ТУДУЛИСТА
        case "REMOVE-TODOLIST": {
            const {id} = action.payload
            const newState = {...state};
            delete newState[id];
            return newState;
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskId
        }
    }
}

export const addTaskAC = (todolistID: string, title: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            title
        }
    }
}

export const changeTaskStatusAC = (taskId: string, isDoneValue: boolean, todolistID: string): ChangeTaskStatusType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID,
            taskId,
            isDoneValue
        }
    }
}

export const changeTaskTitleAC = (taskId: string, newValue: string, todolistID: string): ChangeTaskTitleType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistID,
            taskId,
            newValue
        }
    }
}