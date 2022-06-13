import React, {useEffect} from 'react';
import {AppStoreType, useAppDispatch} from '../../../../Bll/store';
import style from './ProfilePacks.module.css'
import {useSelector} from "react-redux";
import {setCardsTC} from "../../../../Bll/reducers/card-reducer";
import {Packs} from './Packs/Packs';
import Select from '../../Select/Select';
import Preloader from "../../../../Common/Preloader/Preloader";
import Paginator from '../../../../Common/Paginator/Paginator';


export const ProfilePacks = () => {

    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.profile.helpers.loadingStatus) // for preloader
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.cards.cardPacksTotalCount)
    const page = useSelector<AppStoreType, number>(state => state.cards.page)
    const pageCount = useSelector<AppStoreType, number>(state => state.cards.pageCount)
    const selectValue = useSelector<AppStoreType, number>(state => state.cards.selectValue) // количество элементов на одной странице
    const sort = useSelector<AppStoreType, string>(state => state.cards.sortPacks)
    const my = useSelector<AppStoreType, boolean>(state => state.cards.myAll)
    const searchText = useSelector<AppStoreType, string>(state => state.cards.searchText)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCardsTC())
    }, [dispatch, my, sort, selectValue, page, searchText])

    return (
        <div className={style.packList__container}>
            {
                loadingStatus
                    ? <Preloader/>
                    : <>
                        <Packs/>
                        <Select/>

                        <Paginator totalItemsCount={cardPacksTotalCount}
                                   pageSize={pageCount} portionSize={5}
                                   />
                    </>
            }
        </div>

    )
}