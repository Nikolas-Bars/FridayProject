import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Cards.module.css'
import SuperButton from "../../Common/c2-SuperButton/SuperButton";
import SuperDoubleRange from "../../Common/c8-SuperDoubleRange/SuperDoubleRange";
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import {CardDeck} from "../Cards/CardDeck";
import {useDispatch, useSelector} from "react-redux";
import {
    CardReduserStateType,
    CardType,
    newCardPackTC,
    setCardsTC,
    setSearchTextAC, setSelectValueAC, setSortPacksAC
} from "../../Bll/reducers/card-reducer";
import {Dispatch} from "redux";
import {AppStoreType} from "../../Bll/store";
import {Navigate} from "react-router-dom";
import Preloader from "../../Common/Preloader/Preloader";
import {CardsDataType} from "../../Bll/api";
import Paginator from "../../Common/Paginator/Paginator";
import Search from "../Search/Search";
import AddPack from "./AddPack/AddPack";
import MyAll from "./MyAll/MyAll";
import Select from "./Select/Select";
import SliderForCards from "./SliderForCards/SliderForCards";

const Cards = () => {

    const dispatch: Dispatch<any> = useDispatch()

    const [currentPage, setCurrentPage] = useState<number>(1)

    const cardsPacks = useSelector<AppStoreType, CardType[]>(state => state.cards.cardPacks)

    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.login.loadingStatus) // for preloader

    const cards = useSelector<AppStoreType, CardReduserStateType>(state => state.cards)

    const selectValue = useSelector<AppStoreType, number>(state => state.cards.selectValue) // количество элементов на одной странице

    const rangeValue = useSelector<AppStoreType, number[]>(state => state.cards.rangeValue)

    const sort = useSelector<AppStoreType, string>(state => state.cards.sortPacks)

    const my = useSelector<AppStoreType, boolean>(state => state.cards.myAll)

    const id = useSelector<AppStoreType, string>(state => state.login.id)

    useEffect(() => {
            dispatch(setCardsTC(responseData))
        }
        , [])

    let responseData: CardsDataType = {
        pageCount: 10,
        min: rangeValue[0],
        max: rangeValue[1],
        user_id: my ? id : '',  // от этого будет зависеть все колоды показывать или только мои
        sortPacks: sort,
    }

    const setPageNumber = (pageNumber: number) => {
        debugger
        responseData.page = pageNumber // страница по счету которую нужно отобразить
        responseData.pageCount = selectValue
        dispatch(setCardsTC(responseData))
        setCurrentPage(pageNumber)
        dispatch(setSearchTextAC(''))
    }

    const setSort =(newSort: string)=>{
        dispatch(setSortPacksAC(newSort))
        responseData.sortPacks = newSort
        debugger
        dispatch(setCardsTC(responseData))
    }

    let pageArray = []

    for (let i = 0; i <= cards.cardPacksTotalCount / cards.pageCount; i++) {
        pageArray.push(i + 1)
    }

    return (
        <div className={s.main}>

            <SliderForCards/>

            <div className={s.cardsBlock}>
                <h3>Packs list</h3>
                <div className={s.inputBlock}>

                    <Search/>
                    <AddPack/>

                    {loadingStatus && <Preloader/>}

                </div>

                <div className={s.headerWindowOfCards}>
                    <div>Name <button onClick={()=>{setSort('1name')}}>+</button><button onClick={()=>{setSort('0name')}}>-</button></div>
                    <div>Cards <button onClick={()=>{setSort('1cardsCount')}}>+</button><button onClick={()=>{setSort('0cardsCount')}}>-</button></div>
                    <div>Last Updated <button onClick={()=>{setSort('1updated')}}>+</button><button onClick={()=>{setSort('0updated')}}>-</button></div>
                    <div>Created <button onClick={()=>{setSort('1created')}}>+</button><button onClick={()=>{setSort('0created')}}>-</button></div>
                    <div>Actions</div>
                </div>

                {cardsPacks.map(card => <CardDeck key={card._id} name={card.name} cardsCount={card.cardsCount}
                                                  lastUpdate={card.updated} createdBy={card.created}
                                                  actions={'action'}/>)}
                <Select/>

                {/*  // totalItemsCount - кол-во всех элементов пришедших с сервера
                //currentPage - стартовая страница
                //pageSize - кол-во элементов на одной странице
                //portionSize - количество отображаемых на пагинаторе элементов (а справа и слева будут кнопки - уже есть в самом пагинаторе)*/}
                <Paginator totalItemsCount={cards.cardPacksTotalCount} currentPage={currentPage}
                           pageSize={cards.pageCount} portionSize={5} onPageChange={(el: number) => {
                    setPageNumber(el)
                }}/>

            </div>

        </div>
    );
};

export default Cards;