import React from 'react';
import classes from './Name.module.css';
import {IoNavigateCircleOutline} from "react-icons/io5";

const name = (props) => {
    var url = `https://www.google.com/maps/dir/${props.currentLat},${props.currentLng}/${props.data.latitude},${props.data.longitude}/data=!3m1!4b1!4m2!4m1!3e2`;

    return(
        <div className={classes.NameWrapper}>
            {props.data.name}&nbsp;
            <a href={url} target="_blank">
                <IoNavigateCircleOutline />
            </a>

        </div>
    );
}

export default name;
