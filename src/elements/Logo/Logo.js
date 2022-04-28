import React from 'react'

import classes from './Logo.module.css';

const logo = (props) => {
    let logoWithColorScheme = [
        classes.Logo,
        (props.colorScheme === 'dark') ? classes.Dark : classes.Light
    ];
    return(
        <h1 className={logoWithColorScheme.join(' ')} onClick={props.clicked}>
            Covid-19 健保特約機構快篩劑資訊
        </h1>
    );
}

export default logo;