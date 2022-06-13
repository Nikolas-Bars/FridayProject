import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../Bll/store";
import {setSelectValueAC} from "../../../Bll/reducers/card-reducer";
import {Dispatch} from "redux";


const Select = () => {

    const dispatch = useDispatch<Dispatch<any>>()

    const selectValue = useSelector<AppStoreType, number>(state => state.cards.selectValue) // количество элементов на одной странице

    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectValueAC(Number(e.currentTarget.value)))
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