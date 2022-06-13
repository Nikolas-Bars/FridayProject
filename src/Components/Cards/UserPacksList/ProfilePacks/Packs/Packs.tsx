import React from 'react';
import style from './Packs.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../../../Bll/store";
import {CardType, setSortPacksAC} from '../../../../../Bll/reducers/card-reducer';
import SuperButton from '../../../../../Common/c2-SuperButton/SuperButton';
import sortIcon from '../../../../../Common/img/sort/sort.png'

export const Packs = () => {

    const packs = useSelector<AppStoreType, CardType[]>(state => state.cards.cardPacks)
    const sortPacks = useSelector<AppStoreType, string>(state => state.cards.sortPacks)
    const sortNumber = useSelector<AppStoreType, number>(state => state.cards.sortNumber)

    const dispatch = useAppDispatch()

    console.log(sortNumber)

    const handleSortField = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (e.currentTarget.dataset.field) {
            const trigger: string = e.currentTarget.dataset.field
            if (!sortNumber) {
                dispatch(setSortPacksAC(1 + trigger, 1))
            } else {
                dispatch(setSortPacksAC(0 + trigger, 0))
            }
        }
    }

    return (
        <div className={style.packList__body}>
            <div className={style.packList__row}>
                <span
                    className={style.packList__name}
                    data-field="name"
                    onClick={handleSortField}
                >
                    Name
                    {
                        sortPacks.includes('name') &&
                        <img
                            className={sortNumber ? style.packList__updates_img_1 : style.packList__updates_img_0}
                            src={sortIcon}
                            alt="sort"
                        />
                    }
                </span>
                <span
                    className={style.packList__cards}
                    data-field="cardsCount"
                    onClick={handleSortField}
                >
                    Cards
                    {
                        sortPacks.includes('cardsCount') &&
                        <img
                            className={sortNumber ? style.packList__updates_img_1 : style.packList__updates_img_0}
                            src={sortIcon}
                            alt="sort"
                        />
                    }
                </span>
                <span
                    className={style.packList__updates}
                    data-field="updated"
                    onClick={handleSortField}
                >
                        Last Updated
                    {
                        sortPacks.includes('updated') &&
                        <img
                            className={sortNumber ? style.packList__updates_img_1 : style.packList__updates_img_0}
                            src={sortIcon}
                            alt="sort"
                        />
                    }
                </span>
                <span
                    className={style.packList__create}
                    data-field="user_name"
                    onClick={handleSortField}
                >
                    Created by
                    {
                        sortPacks.includes('user_name') &&
                        <img
                            className={sortNumber ? style.packList__updates_img_1 : style.packList__updates_img_0}
                            src={sortIcon}
                            alt="sort"
                        />
                    }
                </span>
                <span className={style.packList__action}>
                    Actions
                </span>
            </div>

            {
                packs && packs.map(pack => {
                    return (
                        <div
                            key={pack._id}
                            className={style.packList__list}
                        >
                            <span className={style.packList__name_none_clicked}>
                                  <NavLink to={'/packs/' + pack._id}>
                                     {pack.name}
                                  </NavLink>
                            </span>
                            <span className={style.packList__cards_none_clicked}>
                                {pack.cardsCount}</span>
                            <span className={style.packList__updates_none_clicked}>
                                    {pack.updated}
                            </span>
                            <span className={style.packList__create_none_clicked}>
                                {pack.user_name}
                            </span>
                            <span className={style.packList__action}>
                                <SuperButton className={style.packList__button_delete}>
                                    Delete
                                </SuperButton>
                                <SuperButton className={style.packList__button_edit_learn}>
                                    Edit
                                </SuperButton>
                                <SuperButton className={style.packList__button_edit_learn}>
                                    Learn
                                </SuperButton>
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}