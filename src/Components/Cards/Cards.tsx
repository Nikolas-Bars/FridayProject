import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Cards.module.css'
import SuperButton from "../../Common/c2-SuperButton/SuperButton";
import SuperDoubleRange from "../../Common/c8-SuperDoubleRange/SuperDoubleRange";
import SuperInputText from "../../Common/c1-SuperInputText/SuperInputText";
import {CardDeck} from "./ CardDeck";
import {useDispatch, useSelector} from "react-redux";
import {CardReduserStateType, CardType, newCardPackTC, setCardsTC} from "../../Bll/reducers/card-reducer";
import {Dispatch} from "redux";
import {AppStoreType} from "../../Bll/store";
import {Navigate} from "react-router-dom";
import Preloader from "../../Common/Preloader/Preloader";
import {CardsDataType} from "../../Bll/api";
import Paginator from "../../Common/Paginator/Paginator";

const Cards = () => {

    const userId = useSelector<AppStoreType, string>(state => state.login.id)

    const dispatch: Dispatch<any> = useDispatch()

    const [selectValue, setSelectValue] = useState<number>(10) // количество элементов на одной странице

    const [currentPage, setCurrentPage] = useState<number>(1)

    const [myAllToggle, setMyAll] = useState<string>("")

    const [rangeValue, setRangeValue] = useState<[number, number]>([0, 20])

    const [searchText, setSearchText] = useState<string>('')

    const [newCardTitle, setNewCardTitle] = useState<string>('')

    const cardsPacks = useSelector<AppStoreType, CardType[]>(state => state.cards.cardPacks)

    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.login.loadingStatus) // for preloader

    const cards = useSelector<AppStoreType, CardReduserStateType>(state => state.cards)



    useEffect(() => {
            dispatch(setCardsTC(responseData))
        }
        , [])

    let responseData: CardsDataType = {
        pageCount: selectValue,
        min: rangeValue[0],
        max: rangeValue[1],
        user_id: myAllToggle  // от этого будет зависеть все колоды показывать или только мои
    }


    const setPageNumber = (pageNumber: number) => {
        responseData.page = pageNumber // страница по счету которую нужно отобразить
        dispatch(setCardsTC(responseData))
        setCurrentPage(pageNumber)
        setSearchText('')
    }

    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(Number(e.currentTarget.value))
        responseData.pageCount = Number(e.currentTarget.value)
        dispatch(setCardsTC(responseData))
        setSearchText('')
    }

    const onMouseUpHandler = () => {
            dispatch(setCardsTC(responseData))
    }

    const cardPackObject = {
        cardsPack: {
            name: newCardTitle,
            deckCover: 'base64',
            private: false
        }
    }

    const addNewPack = () => {
        if (newCardTitle !== '') {
            dispatch(newCardPackTC(cardPackObject))
        }
    }

    const search = () => {
        if (searchText.trim() !== '') {
            responseData = {};
            responseData.packName = searchText
            dispatch(setCardsTC(responseData))
        }
    }

    const myAll = (type: 'my' | 'all') => {
        if (type === "all") {
            setMyAll("")
            responseData.user_id = ''
            dispatch(setCardsTC(responseData))
        } else {
            setMyAll(userId)
            responseData.user_id = userId
            dispatch(setCardsTC(responseData))
        }

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

                    <SuperButton onClick={() => {myAll("my")}}>My</SuperButton>

                    <SuperButton onClick={() => {myAll("all")}}>All</SuperButton></div>

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
                    <SuperInputText value={searchText} onChangeText={setSearchText}/>
                    <SuperButton onClick={search}>search</SuperButton>
                    <SuperInputText value={newCardTitle} onChangeText={setNewCardTitle}/>
                    <SuperButton onClick={addNewPack}>Add new pack</SuperButton>{loadingStatus &&
                <Preloader/>}</div>

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