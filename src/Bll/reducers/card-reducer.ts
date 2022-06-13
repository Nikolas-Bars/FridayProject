import {CardPacksType, cardsAPI, ResponseGetPacksType} from "../api";
import {Dispatch} from "redux";
import {setLoadingStatusAC} from "./profile-reducer";
import {AppStoreType} from "../store";


let initialState: CardReduserStateType = {
    cardPacks: [] as CardType[],
    cardPacksTotalCount: 0,
    // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1, // выбранная страница
    pageCount: 10,    // количество элементов на странице
    searchText: '',
    myAll: false, // переключатель мои либо все колоды. false - показываем все
    selectValue: 10,
    rangeValue: [0, 110],
    sortPacks: '',
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
    sortPacks: string
}

export type CardType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    user_name: string
    updated: string
}

export const CardsReducer = (state: CardReduserStateType = initialState, action: CardsActionType): CardReduserStateType => {
    switch (action.type) {
        case "SET_CARDS":
            return {...state, ...action.cards}
        case "SET_CURRENT_PAGE":
            return {...state, page: action.page}
        case "SET_SEARCH_TEXT":
            return {...state, searchText: action.text}
        case "SET_MYALL":
            return {...state, myAll: action.newValue}
        case "SET_SELECT_VALUE":
            return {...state, selectValue: action.selectValue}
        case "SET_RANGE_VALUE":
            return {...state, rangeValue: action.rangeValue}
        case "SET_SORT_PACKS":
            return {...state, sortPacks: action.sort}
        case "DELETE_CARD_PACK":
            return {...state, cardPacks: state.cardPacks.filter(el => el._id !== action.id)}
        default: {
            return state
        }
    }
}

export type CardsActionType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setSearchTextAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setMyAllAC>
    | ReturnType<typeof setSelectValueAC>
    | ReturnType<typeof setRangeValueAC>
    | ReturnType<typeof setSortPacksAC>
    | ReturnType<typeof deleteCardPackAC>


export const setSearchTextAC = (text: string) => ({type: 'SET_SEARCH_TEXT', text} as const)

export const setCurrentPageAC = (page: number) => ({type: 'SET_CURRENT_PAGE', page} as const)

export const setSortPacksAC = (sort: string) => ({type: 'SET_SORT_PACKS', sort} as const)

export const setMyAllAC = (newValue: boolean) => ({type: 'SET_MYALL', newValue} as const) // перключатель - мои либо все колоды отображаются

export const setCardsAC = (cards: ResponseGetPacksType<CardPacksType[]>) => ({type: 'SET_CARDS', cards} as const)

export const setSelectValueAC = (selectValue: number) => ({type: 'SET_SELECT_VALUE', selectValue} as const)

export const setRangeValueAC = (rangeValue: number[]) => ({type: 'SET_RANGE_VALUE', rangeValue} as const)

export const deleteCardPackAC = (id: string) => ({type: 'DELETE_CARD_PACK', id} as const)


export const setCardsTC = () => (dispatch: Dispatch, getState: () => AppStoreType) => {
    debugger
    dispatch(setLoadingStatusAC(true))

    let {_id} = getState().profile
    let rangeValue1 = getState().cards.rangeValue[0]
    let rangeValue2 = getState().cards.rangeValue[1]

    let {searchText, sortPacks, page, selectValue, myAll} = getState().cards

    if (myAll) {

        cardsAPI.getCards(searchText, rangeValue1, rangeValue2, sortPacks, page, selectValue, _id)

            .then(res => {
                dispatch(setCardsAC(res.data))
            })
            .catch(err => console.log(err))
            .finally(() => {
                dispatch(setLoadingStatusAC(false))
            })
    } else {
        cardsAPI.getCards(searchText, rangeValue1, rangeValue2, sortPacks, page, selectValue)
            .then(res => {
                dispatch(setCardsAC(res.data))
            })
            .catch(err => console.log(err))
            .finally(() => {
                dispatch(setLoadingStatusAC(false))
            })
    }

}

export const newCardPackTC = () => (dispatch: Dispatch) => {
    cardsAPI.newCardPack()
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const deleteCardPackTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC(true))
    cardsAPI.deleteCardPack(id)
        .then(res => {
            // @ts-ignore
            dispatch(setCardsTC())
            dispatch(deleteCardPackAC(id))
        })
        .catch(err => console.log(err))
        .finally(()=>{dispatch(setLoadingStatusAC(false))})

}