import React from 'react';
import s from './Preloader.module.css'
import preloader from '../img/Preloader2.svg'


const Preloader = () => {
    return (
        <div className={s.main}>
            <img src={preloader}/>
        </div>
    );
};

export default Preloader;