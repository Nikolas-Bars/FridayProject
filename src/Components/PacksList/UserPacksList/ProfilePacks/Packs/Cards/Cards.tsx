import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import style from "./Cards.module.css";
import {AppStoreType, useAppDispatch} from "../../../../../../Bll/store";
import arrow from '../../../../../../Common/img/arrow/arrow.png'
import {Questions} from "./Questions/Questions";
import {AddCard} from "../../../../SearchBar_addPack/AddCard/AddCard";
import {SearchBarAddPack} from "../../../../SearchBar_addPack/SearchBarAddPack";
import {getCardsTC} from "../../../../../../Bll/reducers/card-reducer";
import Paginator from '../../../../../../Common/Paginator/Paginator';
import {useSelector} from "react-redux";
import {setCurrentPageAC} from "../../../../../../Bll/reducers/pack-reducer";
import Preloader from "../../../../../../Common/Preloader/Preloader";


export const Cards = () => {

    const {cardId} = useParams<'cardId'>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.profile.helpers.loadingStatus) // for preloader
    const cardTotalCount = useSelector<AppStoreType, number>(state => state.cards.cardsTotalCount)
    const page = useSelector<AppStoreType, number>(state => state.cards.page)
    const pageCount = useSelector<AppStoreType, number>(state => state.cards.pageCount)


    useEffect(() => {
        if (cardId) {
            dispatch(getCardsTC(cardId))
        }
    }, [dispatch, cardId, page])

    const changePageNumber = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    return (
        <div className={style.cards__container}>
            <div className={style.cards__body}>
                <div className={style.cards__header}>
                    <img
                        src={arrow} alt="back"
                        onClick={() => navigate(-1)}
                    />
                    <h4>Pack Name</h4>
                </div>

                <SearchBarAddPack
                    buttonName='Add new card'
                    ModalComponent={AddCard}
                />

                {
                    loadingStatus
                        ? <Preloader/>
                        : <>
                            <Questions/>

                            <Paginator
                                currentPage={page}
                                totalItemsCount={cardTotalCount}
                                pageSize={pageCount}
                                portionSize={5}
                                changePageNumber={changePageNumber}
                            />
                        </>
                }


            </div>
        </div>
    )
}