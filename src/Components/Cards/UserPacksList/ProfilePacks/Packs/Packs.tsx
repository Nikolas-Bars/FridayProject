import React, {useState} from 'react';
import style from './Packs.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../../../Bll/store";
import {CardType, deleteCardPackTC} from '../../../../../Bll/reducers/card-reducer';
import SuperButton from '../../../../../Common/c2-SuperButton/SuperButton';
import sortIcon from '../../../../../Common/img/sort/sort.png'


export const Packs = () => {

    const dispatch = useAppDispatch()

    const packs = useSelector<AppStoreType, CardType[]>(state => state.cards.cardPacks)

    const userID = useSelector<AppStoreType, string>(state => state.profile._id)

    const [sortNumber, setSortNumber] = useState(0);

    const deleteCardPack =(id: string)=>{
        debugger
        dispatch(deleteCardPackTC(id))

    }

    return (
        <div className={style.packList__body}>
            <div className={style.packList__row}>
                <span className={style.packList__name}>
                    Name
                </span>
                <span className={style.packList__cards}>
                    Cards
                </span>
                <span
                    className={style.packList__updates}
                >
                        Last Updated
                    <img
                        className={sortNumber ? style.packList__updates_img_1 : style.packList__updates_img_0}
                        src={sortIcon}
                        alt="sort"
                    />
                </span>
                <span className={style.packList__create}>
                    Created by
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
                            <span className={style.packList__name}>
                                  <NavLink to={'/packs/' + pack._id}>
                                     {pack.name}
                                  </NavLink>
                            </span>
                            <span className={style.packList__cards}>
                                {pack.cardsCount}</span>
                            <span className={style.packList__updates_none_clicked}>
                                    {pack.updated}
                            </span>
                            <span className={style.packList__create}>
                                {pack.user_name}
                            </span>
                            <span className={style.packList__action}>
                                {userID === pack.user_id && <> <SuperButton onClick={()=>{deleteCardPack(pack._id)}} className={style.packList__button_delete}>
                                    Delete
                                </SuperButton>
                                <SuperButton className={style.packList__button_edit_learn}>
                                    Edit
                                </SuperButton> </>}
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