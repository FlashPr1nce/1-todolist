import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, legacy_createStore } from 'redux';
import { AppRootStateType } from "../model/store";
import { tasksReducer } from "../model/tasks-reducer/tasks-reducer";
import { todolistsReducer } from "../model/todolists-reducer/todolists-reducer";
import { v1 } from "uuid";

// Combine reducers
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

// Define initial state
const initialGlobalState = {
    todolists: [
        { id: "todolistId1", title: "What to learn", filter: "all" },
        { id: "todolistId2", title: "What to buy", filter: "all" }
    ],
    tasks: {
        ["todolistId1"]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: false }
        ],
        ["todolistId2"]: [
            { id: v1(), title: "Milk", isDone: false },
            { id: v1(), title: "React Book", isDone: true }
        ]
    }
};

// Create store with initial state
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

// Decorator function
export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>;
}
