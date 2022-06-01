import {loginAPI, LoginDataType, UserInfoResponse} from "../api";
import {Dispatch} from "redux";
import {LoginActionType, setAuthAC, setErrorAC, setLoadingStatusAC} from "./login-reducer";

const initialState = {
    isLoggedIn: false,
    info: null as UserInfoResponse | null,
};

export type LoginState = typeof initialState;

export const ProfileReducer = (
    state = initialState,
    action: LoginActions): LoginState => {
    switch (action.type) {
        case LoginActionEnum.SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.isLoggedIn};
        case LoginActionEnum.SET_USER_INFO:
            return {...state, info: action.info};
        default:
            return state;
    }
}

export type LoginActions =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setUserInfo>;

export enum LoginActionEnum {
    SET_IS_LOGGED_IN = 'login/SET_IS_LOGGED_IN',
    SET_USER_INFO = 'login/SET_USER_INFO',
}

export const setIsLoggedIn = (isLoggedIn: boolean) =>
    ({type: LoginActionEnum.SET_IS_LOGGED_IN, isLoggedIn} as const)

export const setUserInfo = (info: UserInfoResponse | null) =>
    ({type: LoginActionEnum.SET_USER_INFO, info} as const)


export const checkAuthTC = (data: UserInfoResponse) => (dispatch: Dispatch) => {
    loginAPI.checkAuth().then(res => {
        if (res.status === 200) {
            dispatch(setIsLoggedIn(true));
            dispatch(setUserInfo(res.data));
        }
    }).catch(err => {
        let error = err.response ? dispatch(setErrorAC(err.response.data.error)) : dispatch(setErrorAC('Упс... Что-то пошло не так...'))
    }).finally(() => {
        dispatch(setLoadingStatusAC(false))
    })
}