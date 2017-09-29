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
var lat;
var lon;
var index = 0;
var marker;
var markerlist;

export default class GroundWatchiOS extends Component {
  constructor(props) {
      super(props);
      this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        console.log(this.state,"1");

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
    console.log(this.state,"2");

    lat = this.state.latitude;
    lon = this.state.longitude;
    console.log(this.state,"3");

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

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
                latlng: latlong,
                title: name,
                description: name
              };
              markerlist.push(marker);
            }
            else if (type == "fa fa-dot-circle-o") {
              index ++;
              name = 'marker' + index;
              marker = {
                latlng: latlong,
                title: name,
                description: name
              };
              markerlist.push(marker);
            }
            else if (type == "fa fa-tint") {
              index ++;
              name = 'marker' + index;
              marker = {
                latlng: latlong,
                title: name,
                description: name
              };
              markerlist.push(marker);
            }
            else if (type == "fa fa-crosshairs") {
              index ++;
              name = 'marker' + index;
              marker = {
                latlng: latlong,
                title: name,
                description: name
              };
              markerlist.push(marker);
            }
            else if (type == "fa fa-bolt") {
              index ++;
              name = 'marker' + index;
              marker = {
                latlng: latlong,
                title: name,
                description: name
              };
              markerlist.push(marker);
            }
            else {
              index ++;
              name = 'marker' + index;
              marker = {
                latlng: latlong,
                title: name,
                description: name
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
    console.log(markerlist);
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
    marginBottom: 40,
    top: 10,
  },
  button: {
    marginLeft: 70,
    width: 200,
    borderRadius: 5,
    borderWidth: 1,
    bottom: 20,
    borderColor: '#383838',
    backgroundColor: '#383838',
    marginVertical: 5,
    top: 0
  },
  medic: {
    marginLeft: 70,
    width: 200,
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
    height: 175,
    top: 20,
    borderRadius: 5,
    borderWidth: 0
  }
});

AppRegistry.registerComponent('main', () => GroundWatchiOS);
