import {Dispatch} from "redux";
import {loginAPI, RegisterDataType} from "../api";
import {setLoadingStatusAC} from "./login-reducer";

const REGISTER = 'REGISTER'
const SET_ERROR = 'SET_ERROR'

let initialState = {
    error: '',
    success: false,
}

type StateType = {
    error: string | null
    success: boolean
}

export const RegistrationReducer = (state: StateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "REGISTER":
            return {...state, success: true}
        case "SET_ERROR":
            return {...state, error: action.error}
        default: {
            return state
        }
    }
}

export type ActionType = ReturnType<typeof registerAC> | ReturnType<typeof setErrorAC>

const registerAC = () => ({type: REGISTER} as const)
export const setErrorAC = (error: string) => ( {type: SET_ERROR, error} as const)

export const RegisterTC = (data: RegisterDataType) => (dispatch: Dispatch) => {
    loginAPI.regisration(data).then(res => {
        dispatch(setLoadingStatusAC(true))
        if (res.status === 201) {
            dispatch(registerAC())
        }
    }).catch((err)=>{
        dispatch(setErrorAC(err.response.data.error))
    }).finally(()=>{
        dispatch(setLoadingStatusAC(false))
    })
}