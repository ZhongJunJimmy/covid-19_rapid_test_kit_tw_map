import React from "react"
import classes from "./CardList.module.css"
import Card from "../Card/Card"
import StationInfo from '../../components/StationInfo/StationInfo';

const cardList = props => {
    
    return (
        <div className={classes.cardListWrapper}>
            {
                props.data.stationsInfo.map((item)=>{
                    return(
                        <Card key={item.key}>
                            <StationInfo data = {item} curLat = {props.data.location.latitude} curLng={props.data.location.longitude} />
                        </Card>
                    )
                })
            }
        </div>
      )
  
}
export default cardList