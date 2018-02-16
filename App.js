import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import { Camera, Permissions } from 'expo';


export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else {
      return (<View flex>
          <View style={styles.halfHeight}>
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View style={{ flex: 1, backgroundColor: "transparent", flexDirection: "row" }}>
                <TouchableOpacity style={{ flex: 0.1, alignSelf: "flex-end", alignItems: "center" }} onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                    });
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                  >
                    {" "}
                    Flip{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
          <View style={styles.quarterHeight} />
          <View style={[styles.quarterHeight, { backgroundColor: "#CCC" }]} />
                </View>);
  }
}}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  halfHeight: {
    flex: 0.5,
    backgroundColor: "#FF3366"
  },
  quarterHeight: {
    flex: 0.25,
    backgroundColor: "#000"
  }
});
