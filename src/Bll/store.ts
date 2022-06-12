import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {PasswordReducer} from "./reducers/password-reducer";
import {ProfileActionsType, ProfileReducer} from "./reducers/profile-reducer";
import {LoginActionType, LoginReducer} from "./reducers/login-reducer";
import {RegistrationReducer} from "./reducers/registration-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {CardsReducer} from "./reducers/card-reducer";
import {useDispatch} from "react-redux";

const reducers = combineReducers({
    login: LoginReducer,
    password: PasswordReducer,
    profile: ProfileReducer,
    registration: RegistrationReducer,
    cards: CardsReducer,
})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export type AppStoreType = ReturnType<typeof reducers>



export type ThunksDispatch = ThunkDispatch<AppStoreType, any, AppActionType>
export const useAppDispatch = () => useDispatch<ThunksDispatch>()


export type AppActionType = LoginActionType | ProfileActionsType

// @ts-ignore
window.store = store