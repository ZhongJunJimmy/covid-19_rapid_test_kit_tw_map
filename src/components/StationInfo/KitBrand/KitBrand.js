import React from 'react';
import classes from './KitBrand.module.css';
import {BiNote} from "react-icons/bi";

const kitCount = (props) => {
    return(
        <div className={classes.KitCountWrapper}>
            <BiNote className={classes.icon}/>{props.data}
        </div>
    );
}

export default kitCount;