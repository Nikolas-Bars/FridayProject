import axios, {AxiosResponse} from "axios";


export const instance = axios.create({
    //baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const userAPI = {
    regisration(data: NewUserType) {
        return instance.post<{ email: string, password: string }, AxiosResponse<RegistrationResponseType>>('/auth/register', data)
    },
    login(data: NewUserType) {
        return instance.post<NewUserType, AxiosResponse<User>>('/auth/login', data)
    },
    logout() {
        return instance.delete<null, AxiosResponse<{ info: string }>>('/auth/me')
    },
    forgotPassword(email: string) {
        return instance.post<{ email: string }, AxiosResponse<{ info: string }>>('/auth/forgot', {
            email,
            message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='https://nikolas-bars.github.io/FridayProject/#/set-new-password/$token$'>link</a></div>`
        })
    },
    setNewPassword(password: string, token: string) {
        return instance.post<{ password: string, token: string }, AxiosResponse<{ info: string }>>('/auth/set-new-password', {
            password,
            resetPasswordToken: token
        })
    },
    checkAuth() {
        return instance.post<null, AxiosResponse<RegistrationResponseType>>('/auth/me')
    },
    changeUserData(data:{name?: string, avatar?: string}){
        return instance.put<{name?: string, avatar?: string}, AxiosResponse<ResponseType<User>>>('/auth/me', data)
    }
}

export const cardsAPI = {
    getCards(packName: string, min: number, max: number, sortPacks: string, page: number, pageCount: number, user_id?: string) {
        return instance.get<{}, AxiosResponse<ResponseGetPacksType<CardPacksType[]>>>('/cards/pack', {
            params: {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                user_id
            }
        })
    },
    newCardPack(){
        return instance.post('/cards/pack')
     },
    deleteCardPack(id: string){
        return instance.delete(`/cards/pack?id=${id}`)
    },
}


export type CardPacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    user_name: string
    updated: string
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

export type RegistrationResponseType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
}
export type User = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean
    rememberMe: boolean
}
type ResponseType<D = {}> = {
    token: string
    tokenDeathTime: number
    updatedUser: D
}
export type NewUserType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type ResponseGetPacksType<D = []> = {
    cardPacks: D
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}