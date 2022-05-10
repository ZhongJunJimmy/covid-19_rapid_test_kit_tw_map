import React from 'react';

import classes from './Header.module.css';
import Logo from '../../elements/Logo/Logo';
import {BiInfoCircle} from "react-icons/bi";


const Header = (props) => {

    return(
        <header className={classes.Header} style={{backgroundColor: props.color}}>
            <Logo colorScheme={'light'} clicked={props.onClickHandler} />
            <BiInfoCircle color="white"
            className = "{classes.icon}"
            onClick = {()=>alert("第一輪快篩試劑購買說明：\n1. 憑健保卡購買，每人每次限購一份（不限本人)。\n2. 每份含5劑, 每份500元\n3. 以身分證尾號分流\n    單號： 星期一、三、五\n    雙號： 星期二、四、六\n    不限： 星期日")}/>
        </header>
    );
}

export default Header;
