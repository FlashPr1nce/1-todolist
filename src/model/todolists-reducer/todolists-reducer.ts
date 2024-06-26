import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../../App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistID: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

export type ActionsTypeTodolists =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

let todolistId1 = v1()
let todolistId2 = v1()

export const initialStateTodolists: TodolistType[] = []

export const todolistsReducer = (state = initialStateTodolists, action: ActionsTypeTodolists): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.payload.id)
        }

        case 'ADD-TODOLIST': {
            const {todolistID, title} = action.payload
            const todolist: TodolistType = {id: todolistID, filter: 'all', title: title}
            return [...state, todolist]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(el => el.id === action.payload.id)
            if (todolist) {
                todolist.title = action.payload.title
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(el => el.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
            return [...state]
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId1,
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistID: v1()
        }
    } as const
}

export const newTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistID,
            title,
        }
    } as const
}

export const changeTodoListFilterAC = (filter: FilterValuesType, todolistID: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistID,
            filter,
        }
    } as const
}