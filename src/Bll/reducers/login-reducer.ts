import {loginAPI, LoginDataType} from "../api";
import {Dispatch} from "redux";
import {checkAuthTC} from "./profile-reducer";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionType, AppStoreType} from "../store";


let initialState = {
    login: '',
    password: '',
    rememberMe: false,
    error: '',
    auth: false,
    loadingStatus: false,
    id: '',
}

export type LoginStateType = {
    login: string,
    password: string,
    rememberMe: boolean,
    error: string
    auth: boolean,
    loadingStatus: boolean
    id: string
}

export const LoginReducer = (state: LoginStateType = initialState, action: LoginActionType) => {
    switch (action.type) {
        case "login/SET_LOGIN":
            console.log(state.login)
            return {
                ...state,
                login: action.value
            }
        case "login/SET_PASSWORD":
            console.log(state.password)
            return {
                ...state,
                password: action.value
            }
        case "login/SET_REMEMBER_ME":
            console.log(state.rememberMe)
            return {
                ...state,
                rememberMe: action.value
            }
        case "login/SET_ERROR":

            return {
                ...state,
                error: action.value
            }
        case "login/SET_AUTH":
            return {
                ...state,
                auth: action.value,
                id: action.userId

            }
        case "login/LOADING_STATUS":
            return {
                ...state,
                loadingStatus: action.value
        }

        default: {
            return state
        }
    }
}

export type LoginActionType =
    ReturnType<typeof setErrorAC>
    | ReturnType<typeof setLoginAC>
    | ReturnType<typeof setPasswordAC>
    | ReturnType<typeof setRememberMeAC>
    | ReturnType<typeof setAuthAC>
    | ReturnType<typeof setLoadingStatusAC>

export const setLoginAC = (value: string) => ({type: 'login/SET_LOGIN', value} as const)
export const setPasswordAC = (value: string) => ({type: 'login/SET_PASSWORD', value} as const)
export const setRememberMeAC = (value: boolean) => ({type: 'login/SET_REMEMBER_ME', value} as const)
export const setErrorAC = (value: string) => ({type: 'login/SET_ERROR', value} as const)
export const setAuthAC = (value: boolean, userId: string) => ({type: 'login/SET_AUTH', value, userId} as const)
export const setLoadingStatusAC = (value: boolean) => ({type: 'login/LOADING_STATUS', value} as const)

export const loginTC = (data: LoginDataType): ThunkAction<void,  AppStoreType, unknown, AppActionType> => (dispatch: ThunkDispatch<any, any, any>) => {
    dispatch(setLoadingStatusAC(true))
    loginAPI.login(data).then(res => {
        if (res.status === 200) {
            dispatch(setAuthAC(true, res.data._id))
            dispatch(checkAuthTC()); // если залогинились успешно, то запрашиваем данные пользователя.
            console.log(res.data._id)
        }
    }).catch(err => {
        let error = err.response ? dispatch(setErrorAC(err.response.data.error)) : dispatch(setErrorAC('Упс... Что-то пошло не так...'))
    }).finally(()=>{
        dispatch(setLoadingStatusAC(false))
    })
}