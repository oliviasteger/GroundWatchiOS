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
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import PropTypes from 'prop-types';
var createReactClass = require('create-react-class');

var firebaseConfig = {
    apiKey: "AIzaSyAxxfDZ9W1x_iWbJOvgJejUgYpbOk_UqMc",
    authDomain: "groundwatch-1b26e.firebaseapp.com",
    databaseURL: "https://groundwatch-1b26e.firebaseio.com",
    projectId: "groundwatch-1b26e",
    storageBucket: "groundwatch-1b26e.appspot.com",
    messagingSenderId: "812223738339",
    appId: "1:812223738339:web:340ad41b9c1907758f30d6",
    measurementId: "G-7E09WER0ZH"
  };
  firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  var db = firebase.firestore();


var latitude;
var longitude;
var lat;
var lon;
var index = 0;
var marker;
var markerlist;
var loggedDate;

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
}// look at importing specific handlers for the apply

NetInfo.isConnected.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);

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

  getDate() {
    var date = Date();
    date = date.slice(4, -18);
    if (date.slice(0,3) == "Jan") {
      loggedDate = date.slice(7,12) + "/01/" + date.slice(4,6);
    } else if (date.slice(0,3) == "Feb") {
      loggedDate = date.slice(7,12) + "/02/" + date.slice(4,6);
    } else if (date.slice(0,3) == "Mar") {
      loggedDate = date.slice(7,12) + "/03/" + date.slice(4,6);
    } else if (date.slice(0,3) == "Apr") {
      loggedDate = date.slice(7,12) + "/04/" + date.slice(4,6);
    } else if (date.slice(0,3) == "May") {
      loggedDate = date.slice(7,12) + "/05/" + date.slice(4,6);
    } else if (date.slice(0,3) == "Jun") {
      loggedDate = date.slice(7,12) + "/06/" + date.slice(4,6);
    } else if (date.slice(0,3) == "Jul") {
      loggedDate = date.slice(7,12) + "/07/" + date.slice(4,6);
    } else if (date.slice(0,3) == "Aug") {
      loggedDate = date.slice(7,12) + "/08/" + date.slice(4,6);
    } else if (date.slice(0,3) == "Sep") {
      loggedDate = date.slice(7,12) + "/09/" + date.slice(4,6);
    } else if (date.slice(0,3) == "Oct") {
      loggedDate = date.slice(7,12) + "/10/" + date.slice(4,6);
    } else if (date.slice(0,3) == "Nov") {
      loggedDate = date.slice(7,12) + "/11/" + date.slice(4,6);
    } else {
      loggedDate = date.slice(7,12) + "/12/" + date.slice(4,6);
    }
    loggedDate = [date.slice(0, 11), ',', date.slice(11)].join('')
  }

  getIncidents() {
    var date = Date();
    date = date.slice(4, -18);
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
    formatted = [date.slice(0, 11), ',', date.slice(11)].join('')

    db.collection("reports").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let now = new Date();
        let docDate = new Date(doc.data().timeLogged);
        const oneDay = 60 * 60 * 24 * 1000;
        if ((now - docDate) < oneDay) {
          var lat = doc.data().latitude;
          var lon = doc.data().longitude;
          var latlong = {
            "lat": lat,
            "lng": lon
          };
          mapIncident(doc, latlong);
        }
        }
      },
      error: function(err) {
        Alert.alert("You aren't connected to the internet.")
      }
    })

    mapIncident = (doc, latlong) => {
      var type = doc.data().type;
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

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  retryConnection(type) {
    var counter = 0;
    var timer = setInterval(function () {
        if (NetInfo.getConnectionInfo() == "none" || NetInfo.getConnectionInfo() == "cellular" || NetInfo.getConnectionInfo() == "unknown") {
            console.log('Not this time...');
        } else if (NetInfo.getConnectionInfo() == "wifi") {
            this.getDate();
            lat = this.state.latitude;
            lon = this.state.longitude;
            db.collection("reports").add({
              latitude: lat,
              longitude: lon,
              timeLogged: loggedDate,
              type: type
            })
            .then(function (docRef) {
              Alert.alert("Your response has been recorded.");
            })
            .catch(function (error) {
              Alert.alert("Please try again.")
            })

            clearInterval(timer);
        }
        counter++;
    }, 50000);
  }

  _tearGas = () => {
    this.getDate();
    lat = this.state.latitude;
    lon = this.state.longitude;
    db.collection("reports").add({
      latitude: lat,
      longitude: lon,
      timeLogged: loggedDate,
      type: "fa fa-eye"
    })
    .then(function (docRef) {
      Alert.alert("Your response has been recorded.");
    })
    .catch(function (error) {
      retryConnection("fa fa-eye");
    })
  }

  _rubberBullets = () => {
    this.getDate();
    lat = this.state.latitude;
    lon = this.state.longitude;
    db.collection("reports").add({
      latitude: lat,
      longitude: lon,
      timeLogged: loggedDate,
      type: "fa fa-dot-circle-o"
    })
    .then(function (docRef) {
      Alert.alert("Your response has been recorded.");
    })
    .catch(function (error) {
      retryConnection("fa fa-dot-circle-o");
    })
  }
  _waterCannons = () => {
    this.getDate();
    lat = this.state.latitude;
    lon = this.state.longitude;
    db.collection("reports").add({
      latitude: lat,
      longitude: lon,
      timeLogged: loggedDate,
      type: "fa fa-tint"
    })
    .then(function (docRef) {
      Alert.alert("Your response has been recorded.");
    })
    .catch(function (error) {
      retryConnection("fa fa-tint");
    })
  }
  _guns = () => {
    this.getDate();
    lat = this.state.latitude;
    lon = this.state.longitude;
    db.collection("reports").add({
      latitude: lat,
      longitude: lon,
      timeLogged: loggedDate,
      type: "fa fa-crosshairs"
    })
    .then(function (docRef) {
      Alert.alert("Your response has been recorded.");
    })
    .catch(function (error) {
      retryConnection("fa fa-crosshairs");
    })
  }
  _stunGrenades = () => {
    this.getDate();
    lat = this.state.latitude;
    lon = this.state.longitude;
    db.collection("reports").add({
      latitude: lat,
      longitude: lon,
      timeLogged: loggedDate,
      type: "fa fa-bolt"
    })
    .then(function (docRef) {
      Alert.alert("Your response has been recorded.");
    })
    .catch(function (error) {
      retryConnection("fa fa-bolt");
    })
  }
  _medicNeeded = () => {
    this.getDate();
    lat = this.state.latitude;
    lon = this.state.longitude;
    db.collection("reports").add({
      latitude: lat,
      longitude: lon,
      timeLogged: loggedDate,
      type: "fa fa-plus-square"
    })
    .then(function (docRef) {
      Alert.alert("Your response has been recorded.");
    })
    .catch(function (error) {
      retryConnection("fa fa-plus-square");
    })
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
