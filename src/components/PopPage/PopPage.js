import React, { useState } from 'react';
import {FaRegTimesCircle, FaCheck} from "react-icons/fa"
import classes from './PopPage.module.css';

export default function NewCardPop(props) {


    const closeBtn =()=>{
        props.setButtonPop(false);
    }

    return (props.trigger)?(
        <div className={classes.popup}>
            <div className={classes.popupInner}>
                <form>
                    <button className={classes.closeBtn} onClick={()=>closeBtn()}>
                        <FaRegTimesCircle style={{fontSize: "25px", backgroundColor: "transparent"}} />
                    </button>
                    {props.children}

                </form>

            </div>
        </div>
    ):"";
}
