import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {TodolistTaskStateType} from "../../App";
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer/todolists-reducer";

let startState: TodolistTaskStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})


test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {


    const action = addTaskAC( 'todolistId2', 'juice')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].isDone).toBeTruthy()
    expect(endState['todolistId2'][1].isDone).toBeFalsy()
})

test('task title should be changed', () => {


    const action = changeTaskTitleAC('1', 'NewTaskTitle','todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][0].title).toBe('NewTaskTitle')
})

test('new array should be added when new todolists is added', () => {
    //ДАННЫЙ ТЕСТ ПРОВЕРЯЕТ ЧТО БЫЛ СОЗДАН НОВЫЙ ПУСТОЙ МАССИВ ТАСОК В ТО ВРЕМЯ, КОГДА МЫ СОЗДАЛИ НОВЫЙ ТУДУЛИСТ


    //ДАННЫЙ AC МЫ ИМПОРТИРУЕМ ИЗ РЕДЬЮСЕРА ТУДУЛИСТОВ
    const action = addTodolistAC('new todolists')

    const endState = tasksReducer(startState, action)

    // ЗДЕСЬ МЫ ПРОВЕРЯЕМ ТО, ЧТО БЫЛ СОЗДАН ДЕЙСТВИТЕЛЬНО НОВЫЙ ТУДУЛИСТ ID КОТОРОГО НЕ СОВПАДАЕТ С ID СУЩЕСТВУЮЩИХ ТУДУЛИСТОВ
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {


    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})



