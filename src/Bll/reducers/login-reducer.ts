let initialState = {
    login: '',
    password: '',
    rememberMe: false
}

export type LoginStateType = {
    login: string,
    password: string,
    rememberMe: boolean
}

export const LoginReducer =(state: LoginStateType = initialState, action: LoginActionType)=>{
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
        default:{
            return state
        }
    }
}

export type LoginActionType = ReturnType<typeof setLoginAC> | ReturnType<typeof setPasswordAC>

export const setLoginAC = (value: string) =>({type: 'login/SET_LOGIN', value} as const)
export const setPasswordAC = (value: string) =>({type: 'login/SET_PASSWORD', value} as const)