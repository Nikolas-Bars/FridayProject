import React, {useEffect, useState} from 'react';
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
    cards: CardType[]
    index: number
}

const LearnPack = React.memo((props: PropsType) => {

    const packID = useSelector<AppStoreType, string>(state => state.cards.pack_id)

    const packName = useSelector<AppStoreType, PacksType[]>(state => state.packs.cardPacks.filter(el => el._id === packID))

    const [answer, setAnswer] = useState<boolean>(false)

    const dispatch = useDispatch<Dispatch>()

    useEffect(()=>{

    }, props.cards)

    const setToggleModal =()=>{
        dispatch(setLearnToggleAC(false, ''))
    }

    debugger
   // const index = props.cards.length > 0 ? Math.ceil((Math.random()*props.cards.length)) - 1 : 0

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
                    <h4>Question: {props.index >=0 && props.cards[props.index].question}</h4>
                </div>
                <div className={style.learn__buttons}>
                    {!answer ? <div className={style.learn__buttons}><SuperButton
                        className={style.learn__button_cancel}
                        onClick={setToggleModal}
                    >
                        Cancel
                    </SuperButton>
                    <SuperButton
                        className={style.learn__button_save}
                        onClick={()=>{setAnswer(true)}}
                    >
                        Show answer
                    </SuperButton></div> : ''}
                </div>
               {answer &&
               <div>
                   {props.cards[props.index].answer}
               </div>
               }
            </div>

    );
})

export default LearnPack;