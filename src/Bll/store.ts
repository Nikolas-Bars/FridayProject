import {combineReducers, createStore} from "redux";
import {PasswordReducer} from "./reducers/password-reducer";
import {ProfileReducer} from "./reducers/profile-reducer";
import {LoginReducer} from "./reducers/login-reducer";
import {RegistrationReducer} from "./reducers/registration-reducer";

const reducers = combineReducers({
    login: LoginReducer,
    password: PasswordReducer,
    profile: ProfileReducer,
    registration: RegistrationReducer
})

export const store = createStore(reducers)

export type AppStoreType = ReturnType<typeof reducers>