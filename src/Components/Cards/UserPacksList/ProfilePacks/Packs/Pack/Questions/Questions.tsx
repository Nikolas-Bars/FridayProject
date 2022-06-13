import React from 'react';
import style from './Questions.module.css'

export const Questions = () => {
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
        </div>
    )
}