import React from 'react';
import style from './Questions.module.css'
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../../../../Bll/store";
import {CardType} from "../../../../../../../Bll/api";

export const Questions = () => {

    const questions = useSelector<AppStoreType, CardType[]>(state => state.cards.cards)

    return (
        <div className={style.question__container}>
            <div className={style.question__row}>
                <span className={style.question__question}>
                    Question
                </span>
                <span className={style.question__answer}>
                     Answer
                </span>
                <span className={style.question__updated}>
                     Last Updated
                </span>
                <span className={style.question__grade}>
                     Grade
                </span>
            </div>

            {
                questions && questions.map(quest => {
                    return (
                        <div className={style.question__list}>
                            <span className={style.question__question}>
                                {quest.question}
                            </span>
                            <span className={style.question__answer}>
                                {quest.answer}
                            </span>
                            <span className={style.question__updated}>
                                {quest.updated}
                            </span>
                            <span className={style.question__grade}>
                                {quest.grade}
                            </span>
                        </div>
                    )
                })
            }

        </div>
    )
}