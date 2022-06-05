import React from 'react';
import s from './Cards.module.css'
import SuperButton from "../../Common/c2-SuperButton/SuperButton";
import SuperDoubleRange from "../../Common/c8-SuperDoubleRange/SuperDoubleRange";
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import {CardDeck} from "./ CardDeck";

const Cards = () => {
    return (
        <div className={s.main}>
            <div className={s.sidebar}>
                <div style={{margin: '20px auto 20px auto'}}>Show packs cards</div>
                <div className={s.btn}><SuperButton>My</SuperButton><SuperButton>All</SuperButton></div>

                <div style={{margin: '50px auto 30px auto'}}>Number of cards</div>
                <div style={{margin: '0 auto'}}><SuperDoubleRange width={'150px'} value={[15, 36]} handleChange={() => {
                    console.log(5)
                }}/></div>
            </div>
            <div className={s.cardsBlock}>
                <h3>Packs list</h3>
                <div className={s.inputBlock}><SuperInputText/> <SuperButton>Add new pack</SuperButton></div>

                <div className={s.headerWindowOfCards}>
                    <div>Name</div>
                    <div>Cards</div>
                    <div>Last Updated</div>
                    <div>Created by</div>
                    <div>Actions</div>
                </div>

                <CardDeck />

            </div>


        </div>
    );
};

export default Cards;