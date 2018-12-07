import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated } from "react-native";

export default class Draggable extends Component {
  constructor() {
    super();

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this._val = { x: 0, y: 0 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y
        })
        this.state.pan.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: (e, gesture) => {
        if (this.isDropArea(gesture)) {
          Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 1000
          }).start(() =>
            this.setState({
              showDraggable: false
            })
          );
        }
      }
    });
  }

  isDropArea(gesture) {
    return gesture.moveY < 200;
  }

  CIRCLE_RADIUS = 30;
  styles = StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    ballContainer: {
      height: 200
    },
    circle: {
      backgroundColor: "skyblue",
      width: this.CIRCLE_RADIUS * 2,
      height: this.CIRCLE_RADIUS * 2,
      borderRadius: this.CIRCLE_RADIUS
    },
    row: {
      flexDirection: "row"
    },
    dropZone: {
      height: 200,
      backgroundColor: "#00334d"
    },
    text: {
      marginTop: 25,
      marginLeft: 5,
      marginRight: 5,
      textAlign: "center",
      color: "#fff",
      fontSize: 25,
      fontWeight: "bold"
    }
  })

  render() {
    return (
      <View style={{ width: 25, alignItems: "center" }}>
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showDraggable) {
      return (
        <View style={{ position: "absolute" }}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, this.styles.circle, { opacity: this.state.opacity }]}
          />
        </View>
      );
    }
  }
}