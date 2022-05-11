import React, {useState} from 'react';
import classes from './KitCount.module.css';
import {BiTestTube} from "react-icons/bi";
import PopPage from '../../PopPage/PopPage';

const KitCount = (props) => {
  const [ButtonPop,setButtonPop] = useState(false);
    return(
        <div className={classes.KitCountWrapper}>
            <BiTestTube
            onClick={()=>setButtonPop(true)}/>{props.data}
            <PopPage trigger={ButtonPop} setButtonPop={setButtonPop}>
              <pre>{'廠牌：' + props.brand}</pre>
            </PopPage>

        </div>
    );
}

export default KitCount;
