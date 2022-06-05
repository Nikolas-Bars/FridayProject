import React from 'react';
import s from './Cards.module.css'

export const CardDeck = (props: any) => {
    return (
        <div className={s.deck}>
                <div>{props.name}Name</div>
                <div>{props.carsCount}CardsCount</div>
                <div>{props.lastUpdate}Last Updated</div>
                <div>{props.createdBy}Created by</div>
                <div>{props.actions}Actions</div>
        </div>
    );
}
