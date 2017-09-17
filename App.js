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

var incidents = [];
var latitude;
var longitude;
var index = 0;
var marker;
var markerlist;
export default class GroundWatchiOS extends Component {
  componentWillMount() {
    var query = new CB.CloudQuery("report");
    query.setLimit(10000);
    query.find({
      success: function(list) {
        markerlist = [];
        for (var i = 0; i < list.length; i++) {
          var lat = list[i].document.latitude;
          var lon = list[i].document.longitude;
          var latlong = {
            "lat": lat,
            "lng": lon
          };
          incidents.push(latlong);
          var markers = incidents.map(function(location, i) {
            var type = list[i].document.type;
            if (type == "fa fa-eye") {
              index ++;
              name = 'marker' + index;
              marker = {
                latitude: lat,
                longitude: lon,
                title: name
              };
              markerlist.push(marker);
            }
            else if (type == "fa fa-dot-circle-o") {
              index ++;
              name = 'marker' + index;
              marker = {
                latitude: lat,
                longitude: lon,
                title: name
              };
              markerlist.push(marker);
            }
            else if (type == "fa fa-tint") {
              index ++;
              name = 'marker' + index;
              marker = {
                latitude: lat,
                longitude: lon,
                title: name
              };
              markerlist.push(marker);
            }
            else if (type == "fa fa-crosshairs") {
              index ++;
              name = 'marker' + index;
              marker = {
                latitude: lat,
                longitude: lon,
                title: name
              };
              markerlist.push(marker);
            }
            else if (type == "fa fa-bolt") {
              index ++;
              name = 'marker' + index;
              marker = {
                latitude: lat,
                longitude: lon,
                title: name
              };
              markerlist.push(marker);
            }
            else {
              index ++;
              name = 'marker' + index;
              marker = {
                latitude: lat,
                longitude: lon,
                title: name
              };
              markerlist.push(marker);
            }
          });
        }
      },
      error: function(err) {
        Alert.alert("It seems that you are not connected to the internet. Please try again.")
      }
    });
  }

  _tearGas() {
    console.log("You clicked tear gas.");
  }
  _rubberBullets() {
    console.log("You clicked tear gas.");
  }
  _waterCannons() {
    console.log("You clicked tear gas.");
  }
  _guns() {
    console.log("You clicked tear gas.");
  }
  _stunGrenades() {
    console.log("You clicked tear gas.");
  }
  _medicNeeded() {
    console.log("You clicked tear gas.");
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
          <Button onPress={this._rubberBullets} title="Rubber Bullets" color="#FEFEFA" accessibilityLabel="Tear Gas"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button onPress={this._waterCannons} title="Water Cannons" color="#FEFEFA" accessibilityLabel="Tear Gas"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button onPress={this._guns} title="Guns" color="#FEFEFA" accessibilityLabel="Tear Gas"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button onPress={this._stunGrenades} title="Stun Grenades" color="#FEFEFA" accessibilityLabel="Tear Gas"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.medic}>
          <Button onPress={this._medicNeeded} title="Medic Needed" color="#FEFEFA" accessibilityLabel="Tear Gas"/>
        </TouchableOpacity>
        <MapView style={styles.map}>
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
    marginBottom: 50,
  },
  button: {
    marginLeft: 70,
    width: 200,
    borderRadius: 5,
    borderWidth: 1,
    bottom: 20,
    borderColor: '#383838',
    backgroundColor: '#383838',
    marginVertical: 5
  },
  medic: {
    marginLeft: 70,
    width: 200,
    borderRadius: 5,
    borderWidth: 1,
    bottom: 10,
    borderColor: '#ee4b28',
    backgroundColor: '#ee4b28',
    marginVertical: 5,
    top: 0
  },
  map: {
    marginLeft: 20,
    width: 300,
    height: 175,
    top: 10,
    borderRadius: 5,
    borderWidth: 0
  }
});

AppRegistry.registerComponent('main', () => GroundWatchiOS);
