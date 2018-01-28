import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  Timer,
  Image,
  Alert,
  Color,
  ScrollView,
  TouchableOpacity,
  NetInfo // for storing data wirelessly
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

function handleFirstConnectivityChange(isConnected) {
  console.log('The application is ' + (isConnected ? 'online' : 'offline'));
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}// look at \\mporting specific handlers for the apply
NetInfo.isConnected.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);

// var intervalID = setInterval(handleFirstConnectivityChange(), 50000);

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
        if (date.slice(0,3) == "Jan") {
          formatted = date.slice(7,12) + "/01/" + date.slice(4,6);
        } else if (date.slice(0,3) == "Feb") {
          formatted = date.slice(7,12) + "/02/" + date.slice(4,6);
        } else if (date.slice(0,3) == "Mar") {
          formatted = date.slice(7,12) + "/03/" + date.slice(4,6);
        } else if (date.slice(0,3) == "Apr") {
          formatted = date.slice(7,12) + "/04/" + date.slice(4,6);
        } else if (date.slice(0,3) == "May") {
          formatted = date.slice(7,12) + "/05/" + date.slice(4,6);
        } else if (date.slice(0,3) == "Jun") {
          formatted = date.slice(7,12) + "/06/" + date.slice(4,6);
        } else if (date.slice(0,3) == "Jul") {
          formatted = date.slice(7,12) + "/07/" + date.slice(4,6);
        } else if (date.slice(0,3) == "Aug") {
          formatted = date.slice(7,12) + "/08/" + date.slice(4,6);
        } else if (date.slice(0,3) == "Sep") {
          formatted = date.slice(7,12) + "/09/" + date.slice(4,6);
        } else if (date.slice(0,3) == "Oct") {
          formatted = date.slice(7,12) + "/10/" + date.slice(4,6);
        } else if (date.slice(0,3) == "Nov") {
          formatted = date.slice(7,12) + "/11/" + date.slice(4,6);
        } else {
          formatted = date.slice(7,12) + "/12/" + date.slice(4,6);
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
      console.log(markers);
    }
  }

  componentDidMount() {
    // var x = setTimeout(handleFirstConnectivityChange(), 50000);
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
