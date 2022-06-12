import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../Bll/store";
import {setCardsTC, setSearchTextAC, setSelectValueAC} from "../../../Bll/reducers/card-reducer";
import {Dispatch} from "redux";
import {CardsDataType} from "../../../Bll/api";


const Select = () => {

    const dispatch = useDispatch<Dispatch<any>>()

    const selectValue = useSelector<AppStoreType, number>(state => state.cards.selectValue) // количество элементов на одной странице

    const rangeValue = useSelector<AppStoreType, number[]>(state => state.cards.rangeValue)

    const my = useSelector<AppStoreType, boolean>(state => state.cards.myAll)

    const id = useSelector<AppStoreType, string>(state => state.profile._id)

    const responseData: CardsDataType = {
        min: rangeValue[0],
        max: rangeValue[1],
        user_id: my ? id : '',
    }


    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectValueAC(Number(e.currentTarget.value)))
        responseData.pageCount = Number(e.currentTarget.value)
        dispatch(setCardsTC(responseData))
        dispatch(setSearchTextAC(''))
    }

    return (
        <div>
            <select value={selectValue} onChange={selectHandler}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    );
};

export default Select;