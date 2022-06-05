import React from 'react';
import s from './Cards.module.css'
import SuperButton from "../../Common/c2-SuperButton/SuperButton";

const Cards = () => {
    return (
        <div className={s.main}>
            <div className={s.sidebar}>Show packs cards
                <div className={s.btn}><SuperButton>My</SuperButton><SuperButton>All</SuperButton></div>
            </div>

            <h1>CARDS</h1>
        </div>
    );
};

export default Cards;