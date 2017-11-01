import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  Alert,
  Color,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import * as CB from 'cloudboost';
import PropTypes from 'prop-types';
var createReactClass = require('create-react-class');

CB.CloudApp.init('veudsushakhr', 'a4483f55-e614-44cb-a5ee-f7f62a43d39e');

var latitude;
var longitude;
var lat;
var lon;
var index = 0;
var marker;
var markerlist;

const eye = require("./icons/eye.png");
const gun = require("./icons/gun.png");
const light = require("./icons/light.png");
const medic = require("./icons/medic.png");
const target = require("./icons/target.png");
const water = require("./icons/water.png");
const flag = require("./icons/flag.png");

export default class GroundWatchiOS extends Component {
  constructor(props) {
      super(props);
      this.state = {
      latitude: null,
      longitude: null,
      error: null,
      markers: [],
    };
  }

  getIncidents() {
    var date = Date();
    date = date.slice(4, -24);
    var year;
    var month;
    var day;
    var formatted = year + "/" + month + "/" + day;
    if (date.charAt(0) == "O") {
      month = "10";
      if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
      formatted = formatted = year + "/" + month + "/" + day;
      console.log(formatted);
    } else if (date.charAt(0) == "F") {
      month = "02";
      if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
      formatted = formatted = year + "/" + month + "/" + day;
      console.log(formatted);
    } else if (date.charAt(0) == "N") {
      month = "11";
      if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
      formatted = formatted = year + "/" + month + "/" + day;
      console.log(formatted);
    } else if (date.charAt(0) == "D") {
      month = "12";
      if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
      formatted = formatted = year + "/" + month + "/" + day;
      console.log(formatted);
    }  else if (date.charAt(0) == "S") {
      month = "09";
      if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
      else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
      formatted = formatted = year + "/" + month + "/" + day;
      console.log(formatted);
    } else if (date.charAt(0) == "M") {
      if (date.charAt(2) == "R") {
        month = "03";
        if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
        formatted = formatted = year + "/" + month + "/" + day;
        console.log(formatted);
      } else {
        month = "05";
        if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
        formatted = formatted = year + "/" + month + "/" + day;
        console.log(formatted);
      }
    } else if (date.charAt(0) == "A") {
      if (date.charAt(2) == "G") {
        month = "08";
        if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
        formatted = formatted = year + "/" + month + "/" + day;
        console.log(formatted);
      } else {
        month = "04";
        if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
        else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
        formatted = formatted = year + "/" + month + "/" + day;
        console.log(formatted);
      }
    } else {
        if (date.charAt(1) == "A") {
          month = "01";
          if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
          else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
          else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
          else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
          else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
          else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
          formatted = formatted = year + "/" + month + "/" + day;
          console.log(formatted);
        } else {
          if (date.charAt(2) == "L"){
            month = "07";
            if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
            else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
            else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
            else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
            else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
            else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
            formatted = formatted = year + "/" + month + "/" + day;
            console.log(formatted);
          } else {
            month = "06";
            if (date.substr(4,2) == "01") {day = "01";} else if (date.substr(4,2) == "02") {day = "02"; year = date.substr(7,7);} else if (date.substr(4,2) == "03") {day = "03"; year = date.substr(7,7);} else if (date.substr(4,2) == "04") {day = "04"; year = date.substr(7,7);} else if (date.substr(4,2) == "05") {day = "05"; year = date.substr(7,7);} else if (date.substr(4,2) == "06") {day = "06"; year = date.substr(7,7);} else if (date.substr(4,2) == "07") {day = "07"; year = date.substr(7,7);}
            else if (date.substr(4,2) == "08") {day = "08"; year = date.substr(7,7);}
            else if (date.substr(4,2) == "09") {day = "09"; year = date.substr(7,7);} else if (date.substr(4,2) == "10") {day = "10"; year = date.substr(7,7);} else if (date.substr(4,2) == "11") {day = "11"; year = date.substr(7,7);} else if (date.substr(4,2) == "12") {day = "12"; year = date.substr(7,7);} else if (date.substr(4,2) == "13") {day = "13"; year = date.substr(7,7);}
            else if (date.substr(4,2) == "14") {day = "14"; year = date.substr(7,7);} else if (date.substr(4,2) == "15") {day = "15"; year = date.substr(7,7);} else if (date.substr(4,2) == "16") {day = "16"; year = date.substr(7,7);} else if (date.substr(4,2) == "17") {day = "17"; year = date.substr(7,7);} else if (date.substr(4,2) == "18") {day = "18"; year = date.substr(7,7);} else if (date.substr(4,2) == "19") {day = "19"; year = date.substr(7,7);}
            else if (date.substr(4,2) == "20") {day = "20"; year = date.substr(7,7);} else if (date.substr(4,2) == "21") {day = "21"; year = date.substr(7,7);} else if (date.substr(4,2) == "22") {day = "22"; year = date.substr(7,7);} else if (date.substr(4,2) == "23") {day = "23"; year = date.substr(7,7);} else if (date.substr(4,2) == "24") {day = "24"; year = date.substr(7,7);} else if (date.substr(4,2) == "25") {day = "25"; year = date.substr(7,7);}
            else if (date.substr(4,2) == "26") {day = "26"; year = date.substr(7,7);} else if (date.substr(4,2) == "27") {day = "27"; year = date.substr(7,7);} else if (date.substr(4,2) == "28") {day = "28"; year = date.substr(7,7);} else if (date.substr(4,2) == "29") {day = "29"; year = date.substr(7,7);} else if (date.substr(4,2) == "30") {day = "30"; year = date.substr(7,7);} else {day = "31"; year = date.substr(7,7);}
            formatted = formatted = year + "/" + month + "/" + day;
            console.log(formatted);
          }
        }
    }
    var query = new CB.CloudQuery("report");
    query.setLimit(10000);
    query.greaterThan('createdAt', formatted);
    query.find({
      success: function(list) {
        console.log(list);
        for (var i = 0; i < list.length; i++) {
          var lat = list[i].document.latitude;
          var lon = list[i].document.longitude;
          var latlong = {
            "latitude": lat,
            "longitude": lon
          };
          mapIncident(list, latlong, i);
        }
      },
      error: function(err) {
        Alert.alert("It seems that you are not connected to the internet. Please try again.")
      }
    })

    mapIncident = (list, latlong, i) => {
      var type = list[i].document.type;
      if (type == "fa fa-eye") {
        index ++;
        name = 'marker' + index;
        marker = {
          key: name,
          type: type,
          coordinate: latlong,
          title: name,
          description: name,
          image: eye,
        };
      }
      else if (type == "fa fa-dot-circle-o") {
        index ++;
        name = 'marker' + index;
        marker = {
          key: name,
          type: type,
          coordinate: latlong,
          title: name,
          description: name,
          image: target,
        };
      }
      else if (type == "fa fa-flag") {
        index ++;
        name = 'marker' + index;
        marker = {
          key: name,
          type: type,
          coordinate: latlong,
          title: name,
          description: name,
          image: flag,
        };
      }
      else if (type == "fa fa-tint") {
        index ++;
        name = 'marker' + index;
        marker = {
          key: name,
          type: type,
          coordinate: latlong,
          title: name,
          description: name,
          image: water,
        };
      }
      else if (type == "fa fa-crosshairs") {
        index ++;
        name = 'marker' + index;
        marker = {
          key: name,
          type: type,
          coordinate: latlong,
          title: name,
          description: name,
          image: gun,
        };
      }
      else if (type == "fa fa-bolt") {
        index ++;
        name = 'marker' + index;
        marker = {
          key: name,
          type: type,
          coordinate: latlong,
          title: name,
          description: name,
          image: light,
        };
      }
      else {
        index ++;
        name = 'marker' + index;
        marker = {
          key: name,
          type: type,
          coordinate: latlong,
          title: name,
          description: name,
          image: medic,
        };
      }
      const markers = this.state.markers;
      markers.push(marker);
      this.setState({
        markers: markers
      });
    }
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

    lat = this.state.latitude;
    lon = this.state.longitude;

    this.getIncidents();
  }

  _tearGas = () => {
    lat = this.state.latitude;
    lon = this.state.longitude;
    var obj = new CB.CloudObject("report");
    obj.set("type", "fa fa-eye");
    obj.set("latitude", lat);
    obj.set("longitude", lon);
    obj.save({
      success: function(obj) {
        Alert.alert("Your response has been recorded.");
      },
      error: function(err) {
        Alert.alert("Please try again.")
      }
    });

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }


  _rubberBullets = () => {
    lat = this.state.latitude;
    lon = this.state.longitude;
    var obj = new CB.CloudObject("report");
    obj.set("type", "fa fa-dot-circle-o");
    obj.set("latitude", lat);
    obj.set("longitude", lon);
    obj.save({
      success: function(obj) {
        Alert.alert("Your response has been recorded.");
      },
      error: function(err) {
        Alert.alert("Please try again.")
      }
    });
  }
  _waterCannons = () => {
    lat = this.state.latitude;
    lon = this.state.longitude;
    var obj = new CB.CloudObject("report");
    obj.set("type", "fa fa-tint");
    obj.set("latitude", lat);
    obj.set("longitude", lon);
    obj.save({
      success: function(obj) {
        Alert.alert("Your response has been recorded.");
      },
      error: function(err) {
        Alert.alert("Please try again.")
      }
    });
  }
  _guns = () => {
    lat = this.state.latitude;
    lon = this.state.longitude;
    var obj = new CB.CloudObject("report");
    obj.set("type", "fa fa-crosshairs");
    obj.set("latitude", lat);
    obj.set("longitude", lon);
    obj.save({
      success: function(obj) {
        Alert.alert("Your response has been recorded.");
      },
      error: function(err) {
        Alert.alert("Please try again.")
      }
    });
  }
  _stunGrenades = () => {
    lat = this.state.latitude;
    lon = this.state.longitude;
    var obj = new CB.CloudObject("report");
    obj.set("type", "fa fa-bolt");
    obj.set("latitude", lat);
    obj.set("longitude", lon);
    obj.save({
      success: function(obj) {
        Alert.alert("Your response has been recorded.");
      },
      error: function(err) {
        Alert.alert("Please try again.")
      }
    });
  }
  _medicNeeded = () => {
    lat = this.state.latitude;
    lon = this.state.longitude;
    var obj = new CB.CloudObject("report");
    obj.set("type", "fa fa-plus-square");
    obj.set("latitude", lat);
    obj.set("longitude", lon);
    obj.save({
      success: function(obj) {
        Alert.alert("Your response has been recorded.");
      },
      error: function(err) {
        Alert.alert("Please try again.")
      }
    });
  }

  render() {
     function renderOption(option, selected, onSelect, index){
       const style = selected ? { fontWeight: 'bold'} : {};

       return (
         <TouchableWithoutFeedback onPress={onSelect} key={index}>
           <Text style={style}>{option}</Text>
         </TouchableWithoutFeedback>
       );
     }


    return (
      <View style={styles.container}>
      <ScrollView style={{alignContent: 'center'}}>
        <Image style={{width: 300, height: 75, marginLeft: 20}} source={require('./logo.png')}/>
        <Text style={styles.instructions}>
        Anonymously report violence at protests.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Button onPress={this._tearGas} title="Tear Gas" color="#FEFEFA" accessibilityLabel="Tear Gas" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button onPress={this._rubberBullets} title="Rubber Bullets" color="#FEFEFA" accessibilityLabel="Rubber Bullets"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button onPress={this._waterCannons} title="Water Cannons" color="#FEFEFA" accessibilityLabel="Water Cannons"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button onPress={this._guns} title="Guns" color="#FEFEFA" accessibilityLabel="Guns"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button onPress={this._stunGrenades} title="Stun Grenades" color="#FEFEFA" accessibilityLabel="Stun Grenades"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.medic}>
          <Button onPress={this._medicNeeded} title="Medic Needed" color="#FEFEFA" accessibilityLabel="Medic Needed"/>
        </TouchableOpacity>
        <MapView style={styles.map}>
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.key}
            image={marker.image}
            coordinate={marker.coordinate}
          />
        ))}
        </MapView>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEFEFA',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'PT Sans'
  },
  instructions: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
    top: 8,
  },
  button: {
    marginLeft: 40,
    width: 250,
    borderRadius: 5,
    borderWidth: 1,
    bottom: 20,
    borderColor: '#383838',
    backgroundColor: '#383838',
    marginVertical: 5,
    top: 0
  },
  medic: {
    marginLeft: 40,
    width: 250,
    borderRadius: 5,
    borderWidth: 1,
    bottom: 30,
    borderColor: '#ee4b28',
    backgroundColor: '#ee4b28',
    marginVertical: 5,
    top: 0
  },
  map: {
    marginLeft: 20,
    width: 300,
    height: 150,
    top: 20,
    borderRadius: 5,
    borderWidth: 0
  }
});

AppRegistry.registerComponent('main', () => GroundWatchiOS);
