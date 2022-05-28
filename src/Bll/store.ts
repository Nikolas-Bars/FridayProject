import {applyMiddleware, combineReducers, createStore} from "redux";
import {PasswordReducer} from "./reducers/password-reducer";
import {ProfileReducer} from "./reducers/profile-reducer";
import {LoginReducer} from "./reducers/login-reducer";
import {RegistrationReducer} from "./reducers/registration-reducer";
import thunk from 'redux-thunk'


const reducers = combineReducers({
    login: LoginReducer,
    password: PasswordReducer,
    profile: ProfileReducer,
    registration: RegistrationReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store