import axios, {AxiosResponse} from "axios";
import stream from "node:stream";
import {UserType} from "./reducers/profile-reducer";

export const instance = axios.create({
    //baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const loginAPI = {
    login(data: LoginDataType) {
        return instance.post('/auth/login', data)
    },
    checkAuth() {
        return instance.post<{}, AxiosResponse<UserInfoResponse>>('/auth/me', {})
    },
    regisration(data: RegisterDataType) {
        return instance.post('/auth/register', data)
    },
    changeUserName(data:{name?: string, avatar?: string}){
        return instance.put<AxiosResponse<UserType>>('/auth/me', data)
    }
}

export const PasswordAPI = {
    sendInstruction(data: SendInstructionsDataType) { // на локальном не работает - только на хероку
        debugger
        return instance.post('/auth/forgot', data)
    },
    setNewPassword(data: SetPaswordDataType) {
        debugger
        return instance.post('/auth/set-new-password', data)
    }
}

export const cardsAPI = {
    getCards(data: CardsDataType) {
    return  instance.get<AxiosResponse<CardsDataType>>(`/cards/pack`, {params:{
        ...data
        }})
     },
    newCardPack(data: PostCardPack){
        return instance.post('/cards/pack', data)
     }
}



export type CardsDataType = {
    pageCount?: number;
    page?: number;
    sortPacks?: string;
    packName?: string;
    min?: number;
    max?: number;
    user_id?: string;
}

export type PostCardPack = {
    cardsPack:{
        name: string,
        deckCover: string,
        private: boolean
    }}

export type ResponseDataCardType = {
    data: {
        cardPacks: [
            {
                _id: string
                user_id: string
                name: string
                cardsCount: number
                created: string
                updated: string
            },
        ]
        cardPacksTotalCount: number
        // количество колод
        maxCardsCount: number
        minCardsCount: number
        page: number // выбранная страница
        pageCount: number
        // количество элементов на странице

    }
}

export type SetPaswordDataType = {
    password: string,
    resetPasswordToken: string
}

export type SendInstructionsDataType = {
    email: string
    from: string
    message: string
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

