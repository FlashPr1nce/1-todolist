import {TodolistTaskStateType} from "../../App";
import {TasksType} from "../../components/Todolist";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "../todolists-reducer/todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        todolistID: string,
        taskId: string
    }
}

export type AddTaskActionType= {
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

type ActionTypes = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusType | ChangeTaskTitleType |
    //ДАННЫЙ ТИП МЫ ИМПОРТИРОВАЛИ ИЗ РЕДЬЮСЕРА ТУДУЛИСТА
    AddTodolistActionType |
    //ДАННЫЙ ТИП МЫ ИМПОРТИРОВАЛИ ИЗ РЕДЬЮСЕРА ТУДУЛИСТА
    RemoveTodolistActionType

export const tasksReducer = (state: TodolistTaskStateType, action: ActionTypes) => {
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
            const updatedState = state[todolistID].find(t => t.id === taskId)
            if (updatedState) {
                updatedState.isDone = isDoneValue
            }
            return {...state}
        }

        case 'CHANGE-TASK-TITLE': {
            const {todolistID, taskId, newValue} = action.payload
            const updatedState = state[todolistID].find(t => t.id === taskId)
            if (updatedState) {
                updatedState.title = newValue
            }
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
                const newState = { ...state };
                delete newState[id];
                return newState;
        }

        default:
            throw new Error(`Don’t understand action type: ${action}`)
    }
}

export const removeTaskAC = (taskId: string, todolistID: string):RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskId
        }
    }
}

export const addTaskAC = (todolistID: string, title: string):AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            title
        }
    }
}

export const changeTaskStatusAC = (taskId: string, isDoneValue: boolean, todolistID: string):ChangeTaskStatusType => {
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