import {Dispatch} from "redux";
import {PasswordAPI, SendInstructionsDataType, SetPaswordDataType} from "../api";
import {setLoadingStatusAC} from "./login-reducer";

const SEND_INSTRUCTIONS = 'SEND_INSTRUCTIONS'
const SEND_NEW_PASSWORD = 'SEND_NEW_PASSWORD'
const SET_ERROR = 'SET_ERROR'

const initialState = {
    sendSuccess: false,
    passwordChanged: false,
    error: ''
}

export type PasswordStateType = {
    sendSuccess: boolean,
    passwordChanged: boolean
    error: string
}

export const PasswordReducer = (state: PasswordStateType = initialState, action: PasswordReducerActionType): PasswordStateType => {
    switch (action.type) {
        case "SEND_INSTRUCTIONS":
            return {...state, sendSuccess: action.sendSuccess};
        case "SEND_NEW_PASSWORD":
            return {...state, passwordChanged: action.passwordChanged}
        case "SET_ERROR":
            return {...state, error: action.error}
        default: {
            return state
        }
    }
}

export type PasswordReducerActionType = ReturnType<typeof sendInstructionsAC>
    | ReturnType<typeof sendNewPasswordAC>
| ReturnType<typeof setErrorAC>

export const sendInstructionsAC = (sendSuccess: boolean) => ({type: SEND_INSTRUCTIONS, sendSuccess} as const)
export const sendNewPasswordAC = (passwordChanged: boolean) => ({type: SEND_NEW_PASSWORD, passwordChanged} as const)
export const setErrorAC = (error: string) => ({type: SET_ERROR, error} as const)



export const SendInstructionsTC = (data: SendInstructionsDataType) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC(true))
    PasswordAPI.sendInstruction(data).then(res => {
        if (res.status === 200) {
            dispatch(sendInstructionsAC(true))
            console.log(res)
        }
    }).catch((err)=>{
        debugger
        dispatch(setErrorAC(err.message))
    }).finally(()=>{
        dispatch(setLoadingStatusAC(false))
    })
}



export const SetNewPasswordTC = (data: SetPaswordDataType) => (dispatch: Dispatch) => {
    debugger
    PasswordAPI.setNewPassword(data)
        .then(res => {
        debugger
        dispatch(sendNewPasswordAC(true))
        console.log(res)})
        .catch((err)=>{console.log(err)})
}