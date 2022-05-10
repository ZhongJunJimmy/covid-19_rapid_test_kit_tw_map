import React from 'react';
import classes from './Phone.module.css';

const phone = (props) => {
    return(
        <div className={classes.PhoneWrapper}>
            {props.data}
        </div>
    );
}

export default phone;
