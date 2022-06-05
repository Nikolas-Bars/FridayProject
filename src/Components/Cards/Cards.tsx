import React, {useEffect} from 'react';
import s from './Cards.module.css'
import SuperButton from "../../Common/c2-SuperButton/SuperButton";
import SuperDoubleRange from "../../Common/c8-SuperDoubleRange/SuperDoubleRange";
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import {CardDeck} from "./ CardDeck";
import {useDispatch, useSelector} from "react-redux";
import {CardReduserStateType, CardType, setCardsTC} from "../../Bll/reducers/card-reducer";
import {Dispatch} from "redux";
import {AppStoreType} from "../../Bll/store";
import {Navigate} from "react-router-dom";
import Preloader from "../../Common/Preloader/Preloader";

const Cards = () => {

    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        dispatch(setCardsTC('pageCount=10'))
    }, [])


    const cardsPacks = useSelector<AppStoreType, CardType[]>(state => state.cards.cardPacks)
    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.login.loadingStatus) // for preloader
    const cards = useSelector<AppStoreType, CardReduserStateType>(state => state.cards)
    // const data = {
    //     min: 3,  // не обязательно
    //     max:  12,
    //     page:15,
    //     pageCount: 5,
    //
    //
    // }


    if (loadingStatus) {
        return <Preloader />
    }

    let pageArray = []

    for (let i = 0; i <= cards.cardPacksTotalCount / cards.pageCount; i++) {
        pageArray.push(i + 1)
    }

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

                {cardsPacks.map(card => <CardDeck key={card._id} name={card.name} cardsCount={card.cardsCount}
                                                  lastUpdate={card.updated} createdBy={card.created}
                                                  actions={'action'}/>)}


                <div className={s.paginationBlock}>
                    {pageArray.map((pageNumber, index) => <div key={index}>{pageNumber}</div>)}
                </div>
            </div>


        </div>
    );
};

export default Cards;