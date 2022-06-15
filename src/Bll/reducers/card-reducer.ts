import {cardAPI, CardType} from "../api";
import {AppStoreType, ThunksDispatch} from "../store";
import {PacksActionType} from "./pack-reducer";
import {setDisableButtonAC, setErrorToProfileAC, setLoadingStatusAC} from "./profile-reducer";

export type CardsStateType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
}

type CardsReducerStateType = CardsStateType & {
    pack_id: string
}

let initialCardsState: CardsReducerStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    page: 1,
    pageCount: 10,
    pack_id: ''
}

export enum ACTIONS_CARDS_TYPE {
    SET_CARDS = 'CARDS/SET_CARDS',
    SET_NEW_CARD = 'CARDS/SET_NEW_CARD',
    SET_CURRENT_PAGE = 'CARDS/SET_CURRENT_PAGE',
}

export const cardsReducer = (state: CardsReducerStateType = initialCardsState, action: CardsActionType | PacksActionType): CardsReducerStateType => {
    switch (action.type) {
        case ACTIONS_CARDS_TYPE.SET_CARDS: {
            return {
                ...action.cards,
                pack_id: action.pack_id
            }
        }
        case ACTIONS_CARDS_TYPE.SET_NEW_CARD: {
            return {
                ...state,
                cards: [action.card, ...state.cards]
            }
        }
        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                page: action.page
            }
        }
        default: {
            return state
        }
    }
}

export type CardsActionType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setNewCardAC>

export const setCardsAC = (cards: CardsStateType, pack_id: string) => ({
    type: ACTIONS_CARDS_TYPE.SET_CARDS,
    cards,
    pack_id
} as const)
export const setNewCardAC = (card: CardType) => ({
    type: ACTIONS_CARDS_TYPE.SET_NEW_CARD,
    card
} as const)

export const getCardsTC = (id: string) => (dispatch: ThunksDispatch, getState: () => AppStoreType) => {
    dispatch(setLoadingStatusAC(true))
    let {page, pageCount} = getState().cards
    cardAPI.getCards(id, page, pageCount)
        .then(res => {
            dispatch(setCardsAC(res.data, id))
        })
        .finally(() => {
            dispatch(setLoadingStatusAC(false))
        })
}

export const addCardTC = (question: string, answer: string) => (dispatch: ThunksDispatch, getState: () => AppStoreType) => {
    dispatch(setDisableButtonAC(true))
    let {pack_id} = getState().cards
    cardAPI.addCard(pack_id, question, answer)
        .then(res => {
            dispatch(setNewCardAC(res.data.newCard))
            dispatch(setDisableButtonAC(false))
        })
        .catch(err => {
            if (err.response.data) {
                dispatch(setErrorToProfileAC(err.response.data.error))
            } else {
                dispatch(setErrorToProfileAC(err.message))
            }
        })
        .finally(() => {
            dispatch(setDisableButtonAC(false))
        })
}