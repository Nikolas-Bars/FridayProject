import {cardsAPI, CardsDataType, PostCardPack, ResponseDataCardType} from "../api";
import {Dispatch} from "redux";
import {setLoadingStatusAC} from "./login-reducer";


let initialState: CardReduserStateType = {
    cardPacks: [] as CardType[],
    cardPacksTotalCount: 0,
    // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0, // выбранная страница
    pageCount: 0,    // количество элементов на странице
    searchText: '',
    myAll: false, // переключатель мои либо все колоды. false - показываем все
    selectValue: 10,
    rangeValue: [1, 110]
}

export type CardReduserStateType = {
    cardPacks: CardType[]
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
    searchText: string
    myAll: boolean // переключатель мои либо все колоды
    selectValue: number,
    rangeValue: number[],

}

export type CardType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string

}

export const CardsReducer = (state: CardReduserStateType = initialState, action: CardsActionType): CardReduserStateType => {
    switch (action.type) {
        case "SET_CARDS":
            return {...state, ...action.cards}
        case "SET_SEARCH_TEXT":
            return {...state, searchText: action.text}
        case "SET_MYALL":
            return {...state, myAll: action.newValue}
        case "SET_SELECT_VALUE":
            return {...state, selectValue: action.selectValue}
        case "SET_RANGE_VALUE":
            return {...state, rangeValue: action.rangeValue}
        default: {
            return state
        }
    }
}

export type CardsActionType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setSearchTextAC>
    | ReturnType<typeof setMyAllAC>
    | ReturnType<typeof setSelectValueAC>
|ReturnType<typeof setRangeValueAC>

export const setSearchTextAC = (text: string) => ({type: 'SET_SEARCH_TEXT', text} as const)

export const setMyAllAC = (newValue: boolean) => ({type: 'SET_MYALL', newValue} as const) // перключатель - мои либо все колоды отображаются

export const setCardsAC = (cards: CardReduserStateType) => ({type: 'SET_CARDS', cards} as const)

export const setSelectValueAC = (selectValue: number) => ({type: 'SET_SELECT_VALUE', selectValue} as const)

export const setRangeValueAC = (rangeValue: number[]) => ({type: 'SET_RANGE_VALUE', rangeValue} as const)


export const setCardsTC = (data?: CardsDataType) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC(true))
    cardsAPI.getCards({...data})
        .then(res => {
            // @ts-ignore
            dispatch(setCardsAC(res.data))
        }).catch(err => console.log(err))
        .finally(() => {
            dispatch(setLoadingStatusAC(false))
        })
}

export const newCardPackTC = (data: PostCardPack) => (dispatch: Dispatch) => {
    cardsAPI.newCardPack(data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}