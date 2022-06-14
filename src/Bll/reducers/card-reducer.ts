import {cardAPI, CardType} from "../api";
import {AppStoreType, ThunksDispatch} from "../store";
import {PacksActionType} from "./pack-reducer";
import {setLoadingStatusAC} from "./profile-reducer";

export type CardsReducerStateType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
}

let initialCardsState: CardsReducerStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    page: 1,
    pageCount: 10
}

export enum ACTIONS_CARDS_TYPE {
    SET_CARDS = 'CARDS/SET_CARDS',
    SET_CURRENT_PAGE = 'CARDS/SET_CURRENT_PAGE',
}

export const cardsReducer = (state: CardsReducerStateType = initialCardsState, action: CardsActionType | PacksActionType): CardsReducerStateType => {
    switch (action.type) {
        case ACTIONS_CARDS_TYPE.SET_CARDS: {
            return {
                ...action.cards
            }
        }
        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                page: action.page
            }
        }
        case "DELETE_CARD_PACK":
            return {...state, cardPacks: state.cardPacks.filter(el => el._id !== action.id)}
        case "DELETE_CARD_PACK":
            return {...state, cardPacks: state.cardPacks.filter(el => el._id !== action.id)}
            default: {
            return state
        }
    }
}

export type CardsActionType =
    ReturnType<typeof setCardsAC> | | ReturnType<typeof deleteCardPackAC>


export const deleteCardPackAC = (id: string) => ({type: 'DELETE_CARD_PACK', id} as const)


export const setCardsAC = (cards: CardsReducerStateType) => ({
    type: ACTIONS_CARDS_TYPE.SET_CARDS,
    cards
} as const)

export const getCards = (id: string) => (dispatch: ThunksDispatch, getState: () => AppStoreType) => {
    dispatch(setLoadingStatusAC(true))

    let {page, pageCount} = getState().cards
    cardAPI.getCards(id, page, pageCount)
        .then(res => {
            dispatch(setCardsAC(res.data))
        })
        .finally(() => {
            dispatch(setLoadingStatusAC(false))
        })
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