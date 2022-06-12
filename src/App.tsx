import React, {useEffect} from 'react';
import './App.css';
import Routess from "./Components/Routes/Routes";
import NavBar from "./Components/NavBar/NavBar";
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "./Bll/store";
import {isAuthUser} from './Bll/reducers/profile-reducer';


function App() {

    const isInitializedContent = useSelector<AppStoreType, boolean>(state => state.profile.helpers.initializedContent)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isInitializedContent) {
            dispatch(isAuthUser())
        }
    }, [dispatch, isInitializedContent])

    return (
        <div>
            {
                isInitializedContent && <div className="App">
                    <NavBar/>
                    <Routess/>
                </div>
            }

        </div>
    );
}

export default App;
