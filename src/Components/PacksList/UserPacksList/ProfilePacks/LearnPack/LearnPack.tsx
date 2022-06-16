import React from 'react';
import SuperInputText from "../../../../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../../Common/c2-SuperButton/SuperButton";
import style from './LearnPack.module.css'
import closeIcon from "../../../../../Common/img/delete/delete.png"
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {setLearnToggleAC} from "../../../../../Bll/reducers/card-reducer";
import {AppStoreType} from "../../../../../Bll/store";
import {CardType} from "../../../../../Bll/api";
import {PacksType} from "../../../../../Bll/reducers/pack-reducer";

type PropsType = {
    packId: string
}

const LearnPack = (props: PropsType) => {

    const cards = useSelector<AppStoreType, CardType[]>(state => state.cards.cards)

    const packID = useSelector<AppStoreType, string>(state => state.cards.pack_id)
    const packName = useSelector<AppStoreType, PacksType[]>(state => state.packs.cardPacks.filter(el => el._id === packID))


    const dispatch = useDispatch<Dispatch>()

    const setToggleModal =()=>{
        dispatch(setLearnToggleAC(false, ''))
    }
debugger
    return (
           <div className={style.learn}>

                <div className={style.learn__header}>
                    <div className={style.learn__title}>
                        Learn {packName[0].name}
                    </div>
                        <img
                            onClick={setToggleModal}
                            src={closeIcon}
                            alt="close"
                        />
                </div>
                <div className={style.learn__body}>
                    <h4>Question: {cards.length > 0 && cards[Math.ceil((Math.random()*cards.length)-1)] .question}</h4>
                </div>
                <div className={style.learn__buttons}>
                    <SuperButton
                        className={style.learn__button_cancel}
                        onClick={setToggleModal}
                    >
                        Cancel
                    </SuperButton>
                    <SuperButton
                        className={style.learn__button_save}
                    >
                        Show answer
                    </SuperButton>
                </div>
            </div>

    );
};

export default LearnPack;