import React, {useState} from 'react';
import s from "../Cards.module.css";
import MyAll from "../MyAll/MyAll";
import SuperDoubleRange from "../../../Common/c8-SuperDoubleRange/SuperDoubleRange";
import {setCardsTC, setRangeValueAC} from "../../../Bll/reducers/card-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {CardsDataType} from "../../../Bll/api";
import {AppStoreType} from "../../../Bll/store";

const SliderForCards = () => {

    const dispatch = useDispatch<Dispatch<any>>()

    const userId = useSelector<AppStoreType, string>(state => state.login.id)

    const selectValue = useSelector<AppStoreType, number>(state => state.cards.selectValue) // количество элементов на одной странице

    const my = useSelector<AppStoreType, boolean>(state => state.cards.myAll)

    const rangeValue = useSelector<AppStoreType, number[]>(state => state.cards.rangeValue)

    const responseData: CardsDataType = {
        pageCount: selectValue,
        min: rangeValue[0],
        max: rangeValue[1],
        user_id: ''
    }

    const onMouseUpHandler = () => {
        responseData.user_id = my ? userId : ''
        dispatch(setCardsTC(responseData))

    }

    const setRangeValue = (newRangeValue: number[]) => {
        console.log(rangeValue)
        dispatch(setRangeValueAC(newRangeValue))
    }

    return (
        <div className={s.sidebar}>
            <div style={{margin: '20px auto 20px auto'}}>Show packs cards</div>

            <div className={s.btn}>

                <MyAll/>

            </div>

            <div style={{margin: '50px auto 30px auto'}}> Number of cards</div>
            <div style={{margin: '0 auto'}}><SuperDoubleRange width={'150px'} value={rangeValue}
                                                              onMouseFunc={onMouseUpHandler}
                                                              handleChange={(value1, value2) => {
                                                                  setRangeValue([value1, value2])
                                                              }}/>
            </div>
        </div>
    );
};

export default SliderForCards;