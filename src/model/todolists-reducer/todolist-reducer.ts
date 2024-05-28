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

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

let todolistId1 = v1()
let todolistId2 = v1()

const initialState: TodolistType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
]
export const todolistReducer = (state = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id != action.payload.id)
        }

        case 'ADD-TODOLIST': {
            const todolist: TodolistType = {id: v1(), filter: 'all', title: action.payload.title}
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
            throw new Error('Don`t understand that type')
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