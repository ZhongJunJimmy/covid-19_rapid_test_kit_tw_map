import React, { Component } from 'react';
import classes from './App.module.css';
import assetMapping from '../../assets/assetMapping.json';
import { v4 as uuidv4 } from "uuid";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardList from '../../elements/CardList/CardList';


var latitude = "";
var longitude = "";
var getLocationIntervalTime = 60;
var processLive = "";
var stationInfo = [];

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  //console.log(`Location: ${crd.latitude}, ${crd.longitude}`);

  latitude = crd.latitude;
  longitude = crd.longitude;
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      geolocationState: false,
      location:{},
      stationsInfo:[

      ]
    };
  }
  
  // calculate linear distance 
  distance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
}

  //取得快篩試劑販售店家資訊
  getStation = () =>{
    stationInfo = [];
    const URL = 'https://data.nhi.gov.tw/resource/Nhi_Fst/Fstdata.csv';

    fetch(URL, {
        method: 'get',
        headers: {
            'content-type': 'text/plain',
            //'Authorization': //in case you need authorisation
        }
    })
        .then(res => {return res.text()})
        .then(data => {
          //console.log(data);

          var array = data.split("\r");
          //console.log(array[1].split(","));

          /* receive data colume from CSV file:
          ['醫事機構代碼', '醫事機構名稱', '醫事機構地址',
          '經度', '緯度', '醫事機構電話', '廠牌項目',
          '快篩試劑截至目前結餘存貨數量', '來源資料時間', '備註']*/

          for(let i = 1; i<array.length; i++){
            let unitInfo = array[i].split(",");
            let linearDist = this.distance(this.state.location.latitude, this.state.location.longitude, unitInfo[4], unitInfo[3], "K");
            
            stationInfo.push({
              key: uuidv4(),
              name: unitInfo[1],
              address: unitInfo[2],
              longitude: unitInfo[3],
              latitude: unitInfo[4],
              phone: unitInfo[5],
              kitBrand: unitInfo[6],
              kitCnt: unitInfo[7],
              updateDate: unitInfo[8],
              description: unitInfo[9],
              linearDistance: linearDist,
              distance:0
            })
          }

          //console.log(`data: ${JSON.stringify(stationInfo, undefined, 4)}`);

        })
        .catch(err => {
          console.log(`err: ${err}`);
        });
  }

  // get location data by browser and call google map api to get distance
  getLocation = (offset) => {

    //console.log(new Date().toLocaleTimeString());
    this.state.geolocationState=true;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      }, () => {console.log("Get location info fail...");}, options);
      //console.log(`${latitude}, ${longitude}`);
    }

    if(latitude !== "" && longitude !== ""){
      this.setState({
        geolocationState: true,
        location:{
          latitude: latitude,
          longitude: longitude
        }
      });

      if(stationInfo.length > 0){
        // sort store data by linear distance
        for(let j = 0; j < stationInfo.length; j++){
          for(let k = j+1; k < stationInfo.length; k++){
            if(stationInfo[k].linearDistance < stationInfo[j].linearDistance){
              let temp = stationInfo[j];
              stationInfo[j] = stationInfo[k];
              stationInfo[k] = temp;
            }
          }
        }


      if(stationInfo[0].linearDistance >= 0){
        var nearStation = [{},{},{}];
        let nearStationIdx = 0;
        // just show the store info that the kit count > 0
        for(let j = 0; j < stationInfo.length; j++){
          if(stationInfo[j].kitCnt > 0){
            nearStation[nearStationIdx] = stationInfo[j];
            nearStationIdx ++;
          }
          if(nearStationIdx == 5) break;

        }
        if(nearStation[0].distance ==0 ||offset % 10 == 0){
          var origin = new window.google.maps.LatLng(latitude, longitude);
          var destinationA = new window.google.maps.LatLng(nearStation[0].latitude, nearStation[0].longitude);
          var destinationB = new window.google.maps.LatLng(nearStation[1].latitude, nearStation[1].longitude);
          var destinationC = new window.google.maps.LatLng(nearStation[2].latitude, nearStation[2].longitude);
          var destinationD = new window.google.maps.LatLng(nearStation[3].latitude, nearStation[3].longitude);
          var destinationE = new window.google.maps.LatLng(nearStation[4].latitude, nearStation[4].longitude);

          var service = new window.google.maps.DistanceMatrixService();
          // call google map api to get distance
          service.getDistanceMatrix(
          {
            origins: [origin, origin, origin, origin, origin ],
            destinations: [destinationA, destinationB, destinationC, destinationD, destinationE],
            travelMode: 'WALKING'
          }, (res)=>{
            //console.log(res);
            nearStation[0].distance = res.rows[0].elements[0].distance.value;
            nearStation[1].distance = res.rows[0].elements[1].distance.value;
            nearStation[2].distance = res.rows[0].elements[2].distance.value;
            nearStation[3].distance = res.rows[0].elements[3].distance.value;
            nearStation[4].distance = res.rows[0].elements[4].distance.value;

            stationInfo[0].distance = res.rows[0].elements[0].distance.value;
            stationInfo[1].distance = res.rows[0].elements[1].distance.value;
            stationInfo[2].distance = res.rows[0].elements[2].distance.value;
            stationInfo[3].distance = res.rows[0].elements[3].distance.value;
            stationInfo[4].distance = res.rows[0].elements[4].distance.value;
          });

          //sort store data by google map api distance
          for(let j = 0; j < nearStation.length; j++){
            for(let k = j+1; k < nearStation.length; k++){
              if(nearStation[k].distance < nearStation[j].distance){
                let temp = nearStation[j];
                nearStation[j] = nearStation[k];
                nearStation[k] = temp;
              }
            }
          }

        }
        if(nearStation[0].distance >= 0 && nearStation[1].distance >= 0 && nearStation[2].distance >= 0){
          this.setState({
            stationsInfo:nearStation
          });
        }
      }

      }

      //console.log(`${this.state.location.latitude},${this.state.location.longitude}`)
      //this.getStation();
    }
  }

  // check the stats per seconds
  getLocationInfoAndStationInfo = (offset) =>{
    processLive="";
    this.getLocation(offset);
    if(this.state.geolocationState && this.state.stationsInfo.length == 0){
      this.getStation();
    }
    offset = offset - 1;
    //console.log(offset);
    if(offset <= 0){
      offset = getLocationIntervalTime;
      if(this.state.geolocationState){
        this.getStation();
      }
    }

    processLive = setTimeout(this.getLocationInfoAndStationInfo, 1000, offset);
  }

  componentDidMount(){
    this.getLocationInfoAndStationInfo(getLocationIntervalTime)
  }



  render() {
    {
      //console.log(this.state.geolocationState);
      //(this.state.geolocationState)?console.log(`geolocationState: ${this.state.geolocationState}`):this.getLocationInfoAndStationInfo(getLocationIntervalTime)

    }

    return (
      <div className={classes.AppWrapper}>
        <Header
        color={assetMapping._colorDesc[(this.state.geolocationState)? "green":"gray"]}
        onClickHandler={this.getStation}/>
        <CardList data={this.state}></CardList>
        <Footer />
      </div>
    );
  }
}

export default App;
