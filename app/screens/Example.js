import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Button, Animated } from 'react-native';

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.state = {
      marginLeft: 1,
      currentIndex: 0, //
    }

    this.panResponder = PanResponder.create(
      {
        onStartShouldSetPanResponder: (evt, getstureState) => true,
        onPanResponderMove: (evt, getstureState) => {
          // this.setState({
          //   marginLeft: getstureState.moveX
          // });
          this.position.setValue({
            x: getstureState.dx
          })
        }
      }
    );
  }

  render() {
    return (
      <View>
        <View style={ [styles.child, { marginLeft: this.state.marginLeft }] } {...this.panResponder.panHandlers} />
        <Text style={{ fontSize: 30 }}>Swiper in react native</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  child: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'green',
    height: 100,
  }
});
