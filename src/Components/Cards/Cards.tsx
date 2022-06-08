import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Cards.module.css'
import SuperButton from "../../Common/c2-SuperButton/SuperButton";
import SuperDoubleRange from "../../Common/c8-SuperDoubleRange/SuperDoubleRange";
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import {CardDeck} from "./ CardDeck";
import {useDispatch, useSelector} from "react-redux";
import {
    CardReduserStateType,
    CardType,
    newCardPackTC,
    setCardsTC,
    setSearchTextAC, setSelectValueAC
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

const Cards = () => {

    const dispatch: Dispatch<any> = useDispatch()

    //const [selectValue, setSelectValue] = useState<number>(10)

    const [currentPage, setCurrentPage] = useState<number>(1)

    const [rangeValue, setRangeValue] = useState<[number, number]>([0, 20])

    const cardsPacks = useSelector<AppStoreType, CardType[]>(state => state.cards.cardPacks)

    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.login.loadingStatus) // for preloader

    const cards = useSelector<AppStoreType, CardReduserStateType>(state => state.cards)


    const selectValue = useSelector<AppStoreType, number>(state => state.cards.selectValue) // количество элементов на одной странице

    useEffect(() => {
            dispatch(setCardsTC(responseData))
        }
        , [])

    let responseData: CardsDataType = {
        pageCount: 10,
        min: rangeValue[0],
        max: rangeValue[1],
        user_id: ''  // от этого будет зависеть все колоды показывать или только мои
    }

    const setPageNumber = (pageNumber: number) => {
        debugger
        responseData.page = pageNumber // страница по счету которую нужно отобразить
        dispatch(setCardsTC(responseData))
        setCurrentPage(pageNumber)
        dispatch(setSearchTextAC(''))
    }

    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectValueAC(Number(e.currentTarget.value)))
        responseData.pageCount = Number(e.currentTarget.value)
        dispatch(setCardsTC(responseData))
        dispatch(setSearchTextAC(''))
    }

    const onMouseUpHandler = () => {
            dispatch(setCardsTC(responseData))
    }

    let pageArray = []

    for (let i = 0; i <= cards.cardPacksTotalCount / cards.pageCount; i++) {
        pageArray.push(i + 1)
    }

    return (
        <div className={s.main}>

            <div className={s.sidebar}>
                <div style={{margin: '20px auto 20px auto'}}>Show packs cards</div>

                <div className={s.btn}>

                    <MyAll/>

                </div>

                <div style={{margin: '50px auto 30px auto'}}> Number of cards</div>
                <div style={{margin: '0 auto'}}><SuperDoubleRange width={'150px'} value={rangeValue}
                                                                  onMouseFunc={onMouseUpHandler}
                                                                  handleChange={(value1, value2) => {
                                                                      setRangeValue([value1, value2])
                                                                  }}/>
                </div>
            </div>

            <div className={s.cardsBlock}>
                <h3>Packs list</h3>
                <div className={s.inputBlock}>

                    <Search />
                    <AddPack />

  {loadingStatus && <Preloader/>}

                </div>

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

                <div className={s.selectBlock}>
                    <select value={selectValue} onChange={selectHandler}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
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