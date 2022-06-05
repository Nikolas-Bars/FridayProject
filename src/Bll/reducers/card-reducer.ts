import {cardsAPI, CardsDataType, ResponseDataCardType} from "../api";
import {Dispatch} from "redux";
import {setLoadingStatusAC} from "./login-reducer";


let initialState: CardReduserStateType = {
    cardPacks: [] as CardType[],
    cardPacksTotalCount: 0,
    // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0, // выбранная страница
    pageCount: 0,
    // количество элементов на странице
}

export type CardType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}


export type CardReduserStateType = {
    cardPacks: CardType[]
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
    // количество элементов на странице

}

export const CardsReducer = (state: CardReduserStateType = initialState, action: CardsActionType): CardReduserStateType => {
    switch (action.type) {
        case "SET_CARDS":
            debugger
            return action.cards
        default: {
            return state
        }
    }
}

export type CardsActionType = ReturnType<typeof setCardsAC>

export const setCardsAC = (cards: CardReduserStateType) => ({type: 'SET_CARDS', cards} as const)

export const setCardsTC = (request: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC(true))
    cardsAPI.getCards(request)
        .then(res => {
            // @ts-ignore
            dispatch(setCardsAC(res.data))
            console.log(res)
        }).catch(err => console.log(err))
        .finally(() => {
            dispatch(setLoadingStatusAC(false))
        })
}