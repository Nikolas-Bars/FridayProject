import React, {useState} from 'react';
import SuperInputText from "../../../Common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../Common/c2-SuperButton/SuperButton";
import {newCardPackTC} from "../../../Bll/reducers/card-reducer";
import {useDispatch} from "react-redux";
import s from '../../Search/Search.module.css'

const AddPack = () => {

    const dispatch = useDispatch<any>()

    const [newCardTitle, setNewCardTitle] = useState<string>('')

    const cardPackObject = {
        cardsPack: {
            name: newCardTitle,
            deckCover: 'base64',
            private: false
        }
    }

    const addNewPack = () => {
        if (newCardTitle !== '') {
            dispatch(newCardPackTC(cardPackObject))
        }
    }

    return (
        <div className={s.inputBlock}>
            <SuperInputText value={newCardTitle} onChangeText={setNewCardTitle}/>
            <SuperButton onClick={addNewPack}>Add new pack</SuperButton>
        </div>
    );
};

export default AddPack;