import React, {useState} from 'react';
import style from './Packs.module.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../../../Bll/store";
import {deleteCardPackTC, editPackTC, PacksType, setSortPacksAC} from '../../../../../Bll/reducers/pack-reducer';
import SuperButton from '../../../../../Common/c2-SuperButton/SuperButton';
import sortIcon from '../../../../../Common/img/sort/sort.png'
import {Modal} from "../../../../../Common/Modal/Modal";
import DeletePackModal from "./Cards/DeletePackModal";
import EditPack from "./Cards/EditPack";

export const Packs = () => {

    const packs = useSelector<AppStoreType, PacksType[]>(state => state.packs.cardPacks)
    const sortPacks = useSelector<AppStoreType, string>(state => state.packs.sortPacks)
    const sortNumber = useSelector<AppStoreType, number>(state => state.packs.sortNumber)
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)
    const [toggleModal, setToggleModal] = useState<boolean>(false)
    const [currentModal, setCurrentModal] = useState<string>('');

    const [packIDForEditMode, setPackIDForEditMode] = useState<string>('')

    const [packName, setPackName] = useState<string>('');

    const dispatch = useAppDispatch()

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

    const clickActiveModal = (packId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, packName?: string) => {
        setPackIDForEditMode(packId)
        if (e.currentTarget.textContent === 'Delete') {
            setToggleModal(true)
            setCurrentModal(e.currentTarget.textContent)
        } else if (e.currentTarget.textContent === 'Edit') {
            setToggleModal(true)
            setCurrentModal(e.currentTarget.textContent)
            packName && setPackName(packName)
        }
    }

    const deletePack = (id: string) => {
        dispatch(deleteCardPackTC(id))
    }

    const changePackName = (value: string) => {
        dispatch(editPackTC(packIDForEditMode, value))
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
                toggleModal &&
                <Modal toggleModal={toggleModal}>

                    {
                        currentModal === 'Delete' ?
                            <DeletePackModal
                                deletePack={() => deletePack(packIDForEditMode)}
                                setToggleModal={(toggle) => setToggleModal(toggle)}
                            />
                            : <EditPack
                                packName={packName}
                                changePackName={changePackName}
                                setToggleModal={(toggle) => setToggleModal(toggle)}
                            />
                    }

                </Modal>
            }

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

                                {
                                    userID === pack.user_id &&
                                    <>
                                        <SuperButton
                                            onClick={(e) => clickActiveModal(pack._id, e)}
                                            className={style.packList__button_delete}
                                        >
                                            Delete
                                        </SuperButton>


                                        <SuperButton
                                            onClick={(e) => clickActiveModal(pack._id, e, pack.name)}
                                            className={style.packList__button_edit_learn}
                                        >
                                            Edit
                                        </SuperButton>
                                    </>
                                }

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