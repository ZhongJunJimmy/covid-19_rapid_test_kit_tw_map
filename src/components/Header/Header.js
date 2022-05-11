import React, {useState} from 'react';
import classes from './Header.module.css';
import Logo from '../../elements/Logo/Logo';
import {BiInfoCircle} from "react-icons/bi";
import PopPage from '../PopPage/PopPage';


const Header = (props) => {
  const [ButtonPop,setButtonPop] = useState(false);

    return(
        <header className={classes.Header} style={{backgroundColor: props.color}}>
            <Logo colorScheme={'light'} clicked={props.onClickHandler} />
            <BiInfoCircle color="white"
            className = "{classes.icon}"
            onClick = {()=>setButtonPop(true)}/>
            <PopPage trigger={ButtonPop} setButtonPop={setButtonPop}>
              <p>第一輪快篩試劑購買說明：</p>
              <p>1. 憑健保卡購買，每人每次限購一份（不限本人)。</p>
              <p>2. 每份含5劑, 每份500元</p>
              <p>3. 以身分證尾號分流</p>
              <pre>  單號： 星期一、三、五</pre>
              <pre>  雙號： 星期二、四、六</pre>
              <pre>  不限： 星期日</pre>
            </PopPage>
        </header>
    );
}

export default Header;
