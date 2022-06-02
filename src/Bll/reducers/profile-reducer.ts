import {loginAPI, LoginDataType, UserInfoResponse} from "../api";
import {Dispatch} from "redux";
import {LoginActionType, setAuthAC, setErrorAC, setLoadingStatusAC} from "./login-reducer";

const initialState = {
    info: null as UserInfoResponse | null,
};

export type LoginState = typeof initialState;

export const ProfileReducer = (
    state = initialState,
    action: ProfileActionsType): LoginState => {
    switch (action.type) {
        case LoginActionEnum.SET_USER_INFO:
            return {...state, info: action.info};
        default:
            return state;
    }
}

export type ProfileActionsType = ReturnType<typeof setUserInfo>;

export enum LoginActionEnum {
    SET_USER_INFO = 'login/SET_USER_INFO',
}


export const setUserInfo = (info: UserInfoResponse | null) =>
    ({type: LoginActionEnum.SET_USER_INFO, info} as const)


export const checkAuthTC = () => (dispatch: Dispatch) => {
    loginAPI.checkAuth().then(res => {
        if (res.status === 200) {
            debugger
            dispatch(setLoadingStatusAC(true)) // добавил preloader при запросе
            dispatch(setUserInfo(res.data));
        }
    }).catch(err => {
        let error = err.response ? dispatch(setErrorAC(err.response.data.error)) : dispatch(setErrorAC('Упс... Что-то пошло не так...'))
    }).finally(() => {
        dispatch(setLoadingStatusAC(false))
    })
}