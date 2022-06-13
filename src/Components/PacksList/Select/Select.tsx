import React, {ChangeEvent} from 'react';
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "../../../Bll/store";
import {setSelectValueAC} from "../../../Bll/reducers/pack-reducer";


const Select = () => {

    const dispatch = useAppDispatch()

    const selectValue = useSelector<AppStoreType, number>(state => state.packs.selectValue) // количество элементов на одной странице

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