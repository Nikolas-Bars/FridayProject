import React from 'react';
import style from './Cards.module.css'
import SliderForCards from "./SliderForCards/SliderForCards";
import {PacksCardsFilter} from './PacksCardsFilter/PacksCardsFilter';
import {UserPacksList} from './UserPacksList/UserPacksList';

const Cards = () => {

    return (

        <div className={style.profile__container}>
            <div className={style.profile__body}>
                <div className={style.profile__body_profile}>

                    <PacksCardsFilter/>

                    <SliderForCards/>

                </div>
                <div className={style.profile__body_main}>

                    <UserPacksList/>

                </div>
            </div>
        </div>



        //         <div className={s.headerWindowOfCards}>
        //             <div>Name <button onClick={() => {
        //                 setSort('1name')
        //             }}>+</button>
        //                 <button onClick={() => {
        //                     setSort('0name')
        //                 }}>-
        //                 </button>
        //             </div>
        //             <div>Cards <button onClick={() => {
        //                 setSort('1cardsCount')
        //             }}>+</button>
        //                 <button onClick={() => {
        //                     setSort('0cardsCount')
        //                 }}>-
        //                 </button>
        //             </div>
        //             <div>Last Updated <button onClick={() => {
        //                 setSort('1updated')
        //             }}>+</button>
        //                 <button onClick={() => {
        //                     setSort('0updated')
        //                 }}>-
        //                 </button>
        //             </div>
        //             <div>Created <button onClick={() => {
        //                 setSort('1created')
        //             }}>+</button>
        //                 <button onClick={() => {
        //                     setSort('0created')
        //                 }}>-
        //                 </button>
        //             </div>
        //             <div>Actions</div>
        //         </div>
        //
        //         {cardsPacks.map(card => <CardDeck key={card._id} name={card.name} cardsCount={card.cardsCount}
        //                                           lastUpdate={card.updated} createdBy={card.created}
        //                                           actions={'action'}/>)}
        //
        //
    );
};

export default Cards;