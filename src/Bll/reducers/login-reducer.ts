let initialState = {
    login: '',
    password: '',
    rememberMe: false,
    error: '',
}

export type LoginStateType = {
    login: string,
    password: string,
    rememberMe: boolean,
    error: string
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

export const setLoginAC = (value: string) => ({type: 'login/SET_LOGIN', value} as const)
export const setPasswordAC = (value: string) => ({type: 'login/SET_PASSWORD', value} as const)
export const setRememberMeAC = (value: boolean) => ({type: 'login/SET_REMEMBER_ME', value} as const)
export const setErrorAC = (value: string) => ({type: 'login/SET_ERROR', value} as const)