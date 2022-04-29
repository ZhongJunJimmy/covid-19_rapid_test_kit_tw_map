import React from 'react';

import classes from './Header.module.css';
import Logo from '../../elements/Logo/Logo';


const Header = (props) => {

    return(
        <header className={classes.Header} style={{backgroundColor: props.color}}>
            <Logo colorScheme={'light'} clicked={props.onClickHandler} /> 
        </header>
    ); 
}

export default Header;