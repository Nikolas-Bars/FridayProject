import {CardPacksType, packAPI, ResponseGetPacksType} from "../api";
import {setDisableButtonAC, setErrorToProfileAC, setLoadingStatusAC, setModalActiveAC} from "./profile-reducer";
import {AppStoreType, ThunksDispatch} from "../store";


let initialPacksState: PacksReducerStateType = {
    cardPacks: [] as PacksType[],
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
    sortPacks: '0updated',
    sortNumber: 0
}

export type PacksReducerStateType = {
    cardPacks: PacksType[]
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
    sortNumber: number
}

export type PacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    user_name: string
    updated: string
}

export const packsReducer = (state: PacksReducerStateType = initialPacksState, action: PacksActionType): PacksReducerStateType => {
    switch (action.type) {
        case "SET_CARDS":
            return {...state, ...action.cards}
        case "ADD_NEW_CARD": {
            return {...state, cardPacks: [action.card, ...state.cardPacks]}
        }
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
            return {...state, sortPacks: action.sort, sortNumber: action.sortNumber}
        default: {
            return state
        }
    }
}

export type PacksActionType =
    ReturnType<typeof setPacksAC>
    | ReturnType<typeof setSearchTextAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setMyAllAC>
    | ReturnType<typeof setSelectValueAC>
    | ReturnType<typeof setRangeValueAC>
    | ReturnType<typeof setSortPacksAC>
    | ReturnType<typeof addNewCardAC>

export const setPacksAC = (cards: ResponseGetPacksType<CardPacksType[]>) => ({type: 'SET_CARDS', cards} as const)
export const addNewCardAC = (card: any) => ({type: 'ADD_NEW_CARD', card} as const)
export const setSearchTextAC = (text: string) => ({type: 'SET_SEARCH_TEXT', text} as const)
export const setCurrentPageAC = (page: number) => ({type: 'SET_CURRENT_PAGE', page} as const)
export const setSortPacksAC = (sort: string, sortNumber: number) => ({type: 'SET_SORT_PACKS', sort, sortNumber} as const)
export const setMyAllAC = (newValue: boolean) => ({type: 'SET_MYALL', newValue} as const) // перключатель - мои либо все колоды отображаются
export const setSelectValueAC = (selectValue: number) => ({type: 'SET_SELECT_VALUE', selectValue} as const)
export const setRangeValueAC = (rangeValue: number[]) => ({type: 'SET_RANGE_VALUE', rangeValue} as const)


export const setCardsTC = () => (dispatch: ThunksDispatch, getState: () => AppStoreType) => {

    dispatch(setLoadingStatusAC(true))

    let {_id} = getState().profile
    let rangeValue1 = getState().packs.rangeValue[0]
    let rangeValue2 = getState().packs.rangeValue[1]

    let {searchText, sortPacks, page, selectValue, myAll} = getState().packs

    if (myAll) {
        packAPI.getPacks(searchText, rangeValue1, rangeValue2, sortPacks, page, selectValue, _id)
            .then(res => {
                dispatch(setPacksAC(res.data))
            })
            .catch(err => console.log(err))
            .finally(() => {
                dispatch(setLoadingStatusAC(false))
            })
    } else {
        packAPI.getPacks(searchText, rangeValue1, rangeValue2, sortPacks, page, selectValue)
            .then(res => {
                dispatch(setPacksAC(res.data))
            })
            .catch(err => console.log(err))
            .finally(() => {
                dispatch(setLoadingStatusAC(false))
            })
    }

}

export const newCardPackTC = (name: string) => (dispatch: ThunksDispatch) => {
    dispatch(setDisableButtonAC(true))
    packAPI.newPack(name)
        .then(res => {
            dispatch(addNewCardAC(res.data.newCardsPack))
            dispatch(setModalActiveAC(false))
            dispatch(setDisableButtonAC(false))
        })
        .catch(err => {
            if (err.response.data) {
                dispatch(setErrorToProfileAC(err.response.data.error))
            } else {
                dispatch(setErrorToProfileAC(err.message))
            }
        })
}