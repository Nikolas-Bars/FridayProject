import {loginAPI} from "../api";
import {Dispatch} from "redux";
import {setErrorAC, setLoadingStatusAC} from "./login-reducer";

const initialState = {
    created: '',
    email: '',
    isAdmin: false,
    name: '',
    publicCardPacksCount: 0,
    rememberMe: false,
    token: '',
    tokenDeathTime: 0,
    updated: '',
    verified: false,
    __v: 0,
    _id: '',
} as UserType;

export type UserType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}

export const ProfileReducer = (state: UserType = initialState, action: ProfileActionsType): UserType => {
    switch (action.type) {
        case "login/SET_USER_INFO":
            // @ts-ignore
            return {...action.info};
        case "login/CHANGE_USER_NAME":
            // @ts-ignore
            return {...state, name: action.name}
        default:
            return state;
    }
}

export type ProfileActionsType = ReturnType<typeof setUserInfoAC> | ReturnType<typeof changeUserNameInfoAC>;

export const setUserInfoAC = (info: UserType | null) => ({type: 'login/SET_USER_INFO', info} as const)

export const changeUserNameInfoAC = (name: string | null) => ({type: 'login/CHANGE_USER_NAME', name} as const)


export const checkAuthTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC(true)) // добавил preloader при запросе
    loginAPI.checkAuth().then(res => {
        if (res.status === 200) {
            // @ts-ignore
            dispatch(setUserInfoAC(res.data));
        }
    }).catch(err => {
        let error = err.response ? dispatch(setErrorAC(err.response.data.error)) : dispatch(setErrorAC('Упс... Что-то пошло не так...'))
    }).finally(() => {
        dispatch(setLoadingStatusAC(false))
    })
}

export const changeUserNameTC = (name: string) => (dispatch: Dispatch<any>) => {
    loginAPI.changeUserName(name)
        .then(res => {
            debugger// @ts-ignore
            dispatch(setUserInfoAC(res.data.updatedUser))
        })
        .catch(err => {
            let error = err.response ? dispatch(setErrorAC(err.response.data.error)) : dispatch(setErrorAC('Упс... Что-то пошло не так...'))
        }).finally(() => {
        dispatch(setLoadingStatusAC(false))
    })
}