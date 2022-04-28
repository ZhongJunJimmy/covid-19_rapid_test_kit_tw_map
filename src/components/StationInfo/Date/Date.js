import React from 'react';
import classes from './Date.module.css';

const date = (props) => {
    return(
        <div className={classes.DateWrapper}>
            更新日期：{props.data.substring(0,4)}-{props.data.substring(4,6).padStart(2, '0')}-{props.data.substring(6,8).padStart(2, '0')} {props.data.substring(8,10).padStart(2, '0')}:{props.data.substring(10,12).padStart(2, '0')}:{props.data.substring(12,14).padStart(2, '0')}
        </div>
    );
}

export default date;