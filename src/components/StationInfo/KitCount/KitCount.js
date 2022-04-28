import React from 'react';
import classes from './KitCount.module.css';
import {BiTestTube} from "react-icons/bi";

const kitCount = (props) => {
    return(
        <div className={classes.KitCountWrapper}>
            <BiTestTube />{props.data}
        </div>
    );
}

export default kitCount;