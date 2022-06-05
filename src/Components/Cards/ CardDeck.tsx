import React from 'react';
import s from './Cards.module.css'

export type CardDeckPropsType = {
    name: string
    cardsCount: string | number
    lastUpdate: string
    createdBy: string
    actions: string

}

export const CardDeck = (props: CardDeckPropsType) => {
    return (
        <div className={s.deck}>
                <div>{props.name}</div>
                <div>{props.cardsCount}</div>
                <div>{props.lastUpdate}</div>
                <div>{props.createdBy}</div>
                <div>{props.actions}</div>
        </div>
    );
}
