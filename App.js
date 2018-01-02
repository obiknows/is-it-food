import React from 'react';
import { Text, View, TouchableOpacity, Vibration } from 'react-native';
import { CameraExample } from './src/CameraView';


export default class App extends React.Component {
  render() {
    return (
      <View flex>
        <CameraExample />
      </View>
    );
  }
}


