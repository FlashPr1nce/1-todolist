import {TodolistTaskStateType, TodolistType} from "../App"
import {addTodolistAC, todolistsReducer} from "./todolists-reducer/todolists-reducer"
import {tasksReducer} from "./tasks-reducer/tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TodolistTaskStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistID)
    expect(idFromTodolists).toBe(action.payload.todolistID)
})