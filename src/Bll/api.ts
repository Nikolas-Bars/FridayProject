import axios, {AxiosResponse} from "axios";


export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const loginAPI = {
    login(data: LoginDataType){
        return instance.post('/auth/login', data)
    },
    checkAuth() {
        return instance.post<{}, AxiosResponse<UserInfoResponse>>('/auth/me', {})
    },
    regisration(data: RegisterDataType){
        return instance.post('/auth/register', data)
    }
}

export type RegisterDataType = {
    email: string
    password: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type UserInfoResponse = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
};
