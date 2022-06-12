import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./reducers/profile-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk'
import {CardsActionType, CardsReducer} from "./reducers/card-reducer";
import {useDispatch} from "react-redux";

const reducers = combineReducers({
    profile: profileReducer,
    cards: CardsReducer,
})

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export type AppStoreType = ReturnType<typeof reducers>

export type ThunksDispatch = ThunkDispatch<AppStoreType, any, AppActionType>
export const useAppDispatch = () => useDispatch<ThunksDispatch>()


export type AppActionType = ProfileActionsType | CardsActionType

// @ts-ignore
window.store = store