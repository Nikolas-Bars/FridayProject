import axios from "axios";


export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //  baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const loginAPI = {
    login(data: LoginDataType){
        return instance.post('/auth/login', data)
    }
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}
