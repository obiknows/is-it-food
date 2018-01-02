import React from 'react';
import { Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';

export class CameraExample extends React.Component {
  state = {
    hasCameraPermissision: null,  // dont ask for permissions
    type: Camera.Constants.Type.back, // use the back camera
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermissision: status === 'granted' });
  }

  snap = function() {
    
    if (this.camera) {
      this.camera.takePictureAsync().then(
        data => { url = console.log('ayy: ' + data.uri) }
      );
    }
  }

  render() {
    const { hasCameraPermissision } = this.state;
    if ( hasCameraPermissision === null ) {
      return <View />;
    } else if ( hasCameraPermissision === false ) {
      return <Text>No access to the camera</Text>;
    } else {
      return (
        <View flex>
          {/* Camera start */}
          <Camera 
            style={{ width: '100%', height: '70%'}}
            type={this.state.type}
            ref={ref => { this.camera = ref; }}
          >
          </Camera>
          {/* Control Bar */}
          {/* <View style={{ flex:0, backgroundColor: 'green', flexDirection: 'row' }}> */}
            
            <View style={{
              flex: 0, flexDirection: 'row', height:'10%', backgroundColor: 'green',
              alignSelf: 'center', }}>

              {/* FLIP button */}
              <TouchableOpacity 
                style={{ flex: 1, alignSelf: 'flex-start', alignItems: 'flex-start' }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ flex: 1, fontSize: 20, marginBottom: 10, color: 'white'}}>
                  {'  '}Flip
                </Text>
              </TouchableOpacity>
              
              {/* SNAP button */}
              <TouchableOpacity 
                style={{ flex: 1, alignSelf: 'flex-end', alignItems: 'flex-end' }}
                onPress={this.snap.bind(this)}
              >
                <Text style={{ fontSize: 20, marginBottom: 10, color: 'white'}}>
                  Snap{'  '}
                </Text>
              </TouchableOpacity>

            </View>
            {/* </View> */}
            {/* Control Bar END */}
          
        </View>
      );
    }

  }
}