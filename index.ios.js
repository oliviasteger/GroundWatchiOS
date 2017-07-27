import React, { Component } from 'react';
import { RadioButtons } from 'radio-button-react-native'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


export default class GroundWatchiOS extends Component {
  render() {
    const options = [
       "Option 1",
       "Option 2"
     ];

     function setSelectedOption(selectedOption){
       this.setState({
         selectedOption
       });
     }

     function renderOption(option, selected, onSelect, index){
       const style = selected ? { fontWeight: 'bold'} : {};

       return (
         <TouchableWithoutFeedback onPress={onSelect} key={index}>
           <Text style={style}>{option}</Text>
         </TouchableWithoutFeedback>
       );
     }

     function renderContainer(optionNodes){
       return <View>{optionNodes}</View>;
     }

    return (
      <View style={styles.container}>
        <Image style={{width: 300, height: 75}} source={require('./logo.png')}/>
        <Text style={styles.instructions}>
        Anonymously report violence at protests.
        </Text>
        <RadioButtons
          options={ options }
          onSelection={ setSelectedOption.bind(this) }
          selectedOption={ this.state.selectedOption }
          renderOption={ renderOption }
          renderContainer={ renderContainer }
        />
        <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEFEFA',
    color: '#383838',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'PT Sans'
  },
  logo: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  instructions: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GroundWatchiOS', () => GroundWatchiOS);
