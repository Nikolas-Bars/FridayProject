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
        <table>
            <tbody>
        <tr className={s.deck}>
                <td style={{width: '100px'}}>{props.name}</td>
                <td>{props.cardsCount}</td>
                <td>{props.lastUpdate}</td>
                <td>{props.createdBy}</td>
                <td>{props.actions}</td>
        </tr></tbody></table>
    );
}
