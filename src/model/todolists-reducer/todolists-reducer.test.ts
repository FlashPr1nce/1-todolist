import { v1 } from 'uuid'
import {TodolistType} from "../../App";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    newTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";


let todolistId1: string
let todolistId2: string
let startState: TodolistType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    // 1. Стартовый state
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolists should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolists should be added', () => {

    const endState = todolistsReducer(startState, addTodolistAC('New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
})

test('correct todolists should change its name', () => {

    const endState = todolistsReducer(startState, newTodolistTitleAC(todolistId2, 'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})

test('correct filter of todolists should be changed', () => {

    const endState = todolistsReducer(startState, changeTodoListFilterAC('completed', todolistId2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})